import { Analysis } from 'src/app/types/analysis';
import { AnalysisService } from 'src/app/services/analysis.service';
import { StrategiesService } from './../../../services/strategies.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalysisInputs, Stock } from 'src/app/types/stock';
import { v4 as uuidv4 } from 'uuid';
import { Strategy } from 'src/app/types/strategy';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'add-stock-dialog',
  templateUrl: './add-stock-dialog.component.html',
  styleUrls: ['./add-stock-dialog.component.scss'],
})
export class AddStockDialogComponent implements OnInit {
  public stockForm: FormGroup;

  public strategies: Strategy[];
  public selectedStrategy: Strategy;

  public analysis: Analysis[] = [];
	public analysisInputs: AnalysisInputs = {};

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<any>,

		private strategiesService: StrategiesService,
		private analysisService: AnalysisService,
		private stocksService: StocksService
  ) {}

  ngOnInit() {

		console.log('st', );
		this.strategies = this.strategiesService.strategies$.value;

    this.stockForm = this.fb.group({
      name: ['', [Validators.required]],
      longName: ['', []],
			strategy: [null]
    });

		this.stockForm.get('strategy').valueChanges.subscribe((id) => {
			this.selectedStrategy = this.strategies.find(s => s.id == id);
			this.analysis = this.analysisService.analysis$.value.filter(a => a.strategyId === this.selectedStrategy.id)

			this.fillAnalysisInputs();
			console.log('selectedStrategy', this.selectedStrategy);
			console.log('analysis', this.analysis);
		})
  }

	fillAnalysisInputs() {
		this.analysisInputs[this.selectedStrategy.id] = {};

		for (const ana of this.analysis) {
			this.analysisInputs[this.selectedStrategy.id][ana.id] = {};
			for (const param of ana.parameters) {
				this.analysisInputs[this.selectedStrategy.id][ana.id][param.id] = null;
			}
		}
	}

	onSave() {

		const lastCalculatedResult = this.stocksService.calculateResult(this.selectedStrategy.id, this.analysisInputs, this.analysis);

		console.log('%c ---> lastCalculatedResult ', 'color: #de4209', lastCalculatedResult);

		const stock: Stock = {
			id: uuidv4(),
			name: this.stockForm.get('name').value,
			longName: this.stockForm.get('longName').value,
			color: null,
			lastCalculatedResult,
			analysisInputs: this.analysisInputs
		}

		console.log('stock', stock );

		// this.stocksService.calculateResult();

	}
}
