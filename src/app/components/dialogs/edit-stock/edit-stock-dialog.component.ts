import { Analysis } from 'src/app/types/analysis';
import { AnalysisService } from 'src/app/services/analysis.service';
import { StrategiesService } from '../../../services/strategies.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalysisInputs, Stock } from 'src/app/types/stock';
import { v4 as uuidv4 } from 'uuid';
import { Strategy } from 'src/app/types/strategy';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'edit-stock-dialog',
  templateUrl: './edit-stock-dialog.component.html',
  styleUrls: ['./edit-stock-dialog.component.scss'],
})
export class EditStockDialogComponent implements OnInit {
  public stockForm: FormGroup;

  public strategies: Strategy[];
  public selectedStrategy: Strategy;

  public analysis: Analysis[] = [];
  public analysisInputs: AnalysisInputs = {};

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stock: Stock; strategyId: string },

    private strategiesService: StrategiesService,
    private analysisService: AnalysisService,
    private stocksService: StocksService
  ) {}

  ngOnInit() {
    console.log('st');
    this.strategies = this.strategiesService.strategies$.value;

    this.stockForm = this.fb.group({
      name: [this.data.stock.name, [Validators.required]],
      longName: [this.data.stock.longName, []],
      strategy: [this.data.strategyId],
    });

    this.determineStrategy(this.data.strategyId);

    this.stockForm.get('strategy').valueChanges.subscribe((id) => {
      this.determineStrategy(id);
    });
  }

  fillAnalysisInputs() {
    console.log('fillAnalysisInputs');
    const existingData = this.data.stock.analysisInputs;

    for (const ana of this.analysis) {
      if (existingData[this.selectedStrategy.id]) {
        this.analysisInputs[this.selectedStrategy.id] = {};

        if (existingData[this.selectedStrategy.id][ana.id]) {
          this.analysisInputs[this.selectedStrategy.id][ana.id] = {};

          for (const param of ana.parameters) {
            if (existingData[this.selectedStrategy.id][ana.id][param.id]) {
              const existingValue =
                existingData[this.selectedStrategy.id][ana.id][param.id];
              this.analysisInputs[this.selectedStrategy.id][ana.id][param.id] =
                existingValue;
            }
          }
        }
      }
    }

		console.log('this.analysisInputs', this.analysisInputs);
  }

  determineStrategy(id: string) {
    this.selectedStrategy = this.strategies.find((s) => s.id == id);
    this.analysis = this.analysisService.analysis$.value.filter(
      (a) => a.strategyId === this.selectedStrategy.id
    );
    this.fillAnalysisInputs();
  }

  onSave() {
    const result = this.stocksService.calculateResult(
      this.selectedStrategy.id,
      this.analysisInputs,
      this.analysis
    );

    if (!this.data.stock.lastCalculatedResult[this.selectedStrategy.id]) {
      this.data.stock.lastCalculatedResult = {
        [this.selectedStrategy.id]: result,
      };
    } else {
      this.data.stock.lastCalculatedResult[this.selectedStrategy.id] = result;
    }

    const stock: Stock = {
      id: this.data.stock.id,
      name: this.stockForm.get('name').value,
      longName: this.stockForm.get('longName').value,
      color: this.data.stock.color,
      lastCalculatedResult: this.data.stock.lastCalculatedResult,
      analysisInputs: this.analysisInputs,
    };

    console.log('updated stock', stock);

    this.dialogRef.close(stock);
  }
}
