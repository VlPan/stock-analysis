import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Strategy } from 'src/app/types/strategy';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-strategy-dialog',
  templateUrl: './strategy-dialog.component.html',
  styleUrls: ['./strategy-dialog.component.scss'],
})
export class StrategyDialogComponent implements OnInit {
  public strategyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StrategyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Strategy>
  ) {}

  ngOnInit() {
    this.strategyForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

	onSave() {
		const strategy: Strategy = {
			id: uuidv4(),
			name: this.strategyForm.get('name').value,
			dateAdded: new Date(),
			color: null,
			copiedFrom: null
		}

		this.dialogRef.close(strategy)
	}
}
