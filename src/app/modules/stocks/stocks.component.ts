import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddStockDialogComponent } from 'src/app/components/dialogs/add-stock/add-stock-dialog.component';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  constructor(private dialog: MatDialog, private stocksService: StocksService) { }

  ngOnInit() {
  }

	addStock() {
		this.dialog.open(AddStockDialogComponent);
	}

}
