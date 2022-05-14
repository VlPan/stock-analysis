import { ConfirmDialogComponent } from './../../components/dialogs/confirm/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddStockDialogComponent } from 'src/app/components/dialogs/add-stock/add-stock-dialog.component';
import { StocksService } from 'src/app/services/stocks.service';
import { Stock } from 'src/app/types/stock';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { SecuritiesIncludedInAnalysis } from 'src/app/services/included-in-analysis.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { EditStockDialogComponent } from 'src/app/components/dialogs/edit-stock/edit-stock-dialog.component';
import { Strategy } from 'src/app/types/strategy';
import { StrategiesService } from 'src/app/services/strategies.service';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  public stocks: Stock[] = [];
  public dataSource: MatTableDataSource<Stock>;
  public selectedStrategyId: string;
  public strategies: Strategy[];
  public balance: number = 0;
	public allocation: Record<string, any> = {};

  selection = new SelectionModel<string>(true, []);
  displayedColumns: string[] = [
    'select',
    'name',
    'longName',
    'lastCalculatedResult',
		'allocation',
    'edit',
    'delete',
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private stocksService: StocksService,
    private includedService: SecuritiesIncludedInAnalysis,
    private strategiesService: StrategiesService,
    private balanceService: BalanceService
  ) {}

  ngAfterViewInit() {
    console.log('this.sort', this.sort);
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.balance = this.balanceService.get();
    this.selectedStrategyId = this.strategiesService.getDefaultStrategyId();
    this.strategies = this.strategiesService.strategies$.value;
    this.stocksService.stocks$.subscribe((stocks) => {
      this.stocks = stocks;
      this.dataSource = new MatTableDataSource<Stock>(this.stocks);
    });

    this.includedService.included$.value.forEach((id) => {
      this.selection.select(id);
    });

		this.allocateBalance();
  }

  public updateBalance(event: Event) {
    this.balanceService.set((event.target as HTMLInputElement).value);
		this.balance = +(event.target as HTMLInputElement).value;
  }

  addStock() {
    const dialogRef = this.dialog.open(AddStockDialogComponent);

    dialogRef.afterClosed().subscribe((stock: Stock) => {
      if (stock) {
        this.stocksService.add(stock);
      }
    });
  }

  allocateBalance() {
    const allocation = {};
    const includedInCalculation = this.includedService.included$.value.map(
      (id) => this.stocks.find((s) => s.id === id)
    );
    const sum = includedInCalculation.reduce((acc, cur) => {
      return acc + cur.lastCalculatedResult[this.selectedStrategyId];
    }, 0);

    for (const stock of includedInCalculation) {
      allocation[stock.id] = parseFloat(
        (
					(this.balance / sum) * stock.lastCalculatedResult[this.selectedStrategyId]

        ).toString()
      ).toFixed(2);
    }

		this.allocation = allocation;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: Stock): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row.id) ? 'deselect' : 'select'}`;
  }

  deleteStock(row?: Stock) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Stock',
        message: `Are you sure you want to delete stock ${row.name} = ${row.longName}`,
      },
    });
    dialogRef.afterClosed().subscribe((isUserAgree: boolean) => {
      if (isUserAgree) {
        this.stocksService.delete(row);
				this.includedService.delete(row.id);
      }
    });
  }

  editStock(row?: Stock) {
    let dialogRef = this.dialog.open(EditStockDialogComponent, {
      data: {
        stock: row,
        strategyId: '6e558027-f665-490b-861b-0acf0b96a3b0',
      },
    });
    dialogRef.afterClosed().subscribe((isUserAgree: boolean) => {
      if (isUserAgree) {
        this.stocksService.update(row);
      }
    });
  }

  toggleInclude(checkbox: MatCheckboxChange, stock: Stock) {
    if (checkbox.checked) {
      this.includedService.add(stock.id);
    } else {
      this.includedService.delete(stock.id);
    }
  }
}
