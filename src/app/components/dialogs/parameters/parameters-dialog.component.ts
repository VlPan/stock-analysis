import { ParameterType } from './../../../types/parameter';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Analysis } from 'src/app/types/analysis';
import { Parameter } from 'src/app/types/parameter';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-parameters-dialog',
  templateUrl: './parameters-dialog.component.html',
  styleUrls: ['./parameters-dialog.component.scss'],
})
export class ParametersDialogComponent implements OnInit {
  public paramsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ParametersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {analysisData: Partial<Parameter>}
  ) {}

  ngOnInit() {
    this.paramsForm = this.fb.group({
      name: ['', [Validators.required]],
			weight: [1, [Validators.required, Validators.min(0)]],
			min: [1, [Validators.required]],
			max: [1, [Validators.required]]
    });

		this.paramsForm.setValidators(RangeValidator)
  }

	onSave() {		
		const parameter: Parameter = {
			id: uuidv4(),
			type: ParameterType.NUMBER,
			name: this.paramsForm.get('name').value,
			weight: this.paramsForm.get('weight').value,
			min: this.paramsForm.get('min').value,
			max: this.paramsForm.get('max').value,
			color: null,
		}

		this.dialogRef.close(parameter)
	}
}

export const RangeValidator = (group: FormGroup) => {
	const min = group.controls['min'].value;
	const max = group.controls['max'].value;

	if(min > max) {
		return {invalidRange: 'min can not be more than max'}
	}
	return {};
}