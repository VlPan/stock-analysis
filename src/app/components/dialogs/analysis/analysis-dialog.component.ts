import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Analysis } from 'src/app/types/analysis';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-analysis-dialog',
  templateUrl: './analysis-dialog.component.html',
  styleUrls: ['./analysis-dialog.component.scss'],
})
export class AnalysisDialogComponent implements OnInit {
  public analysisForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AnalysisDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: {analysisData: Partial<Analysis>, strategyId: string}
  ) {}

  ngOnInit() {
    this.analysisForm = this.fb.group({
      name: ['', [Validators.required]],
			weight: [1, [Validators.required, Validators.min(0)]]
    });
  }

	onSave() {
		const strategyId = this.data.strategyId;
		
		const analysis: Analysis = {
			id: uuidv4(),
			name: this.analysisForm.get('name').value,
			weight: this.analysisForm.get('weight').value,
			strategyId,
			dateAdded: new Date(),
			color: null,
			copiedFrom: null,
			parameters: []
		}

		this.dialogRef.close(analysis)
	}
}
