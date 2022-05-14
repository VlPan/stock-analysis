import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnalysisService } from './../../services/analysis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Analysis } from 'src/app/types/analysis';
import { Parameter } from 'src/app/types/parameter';
import { ParametersDialogComponent } from 'src/app/components/dialogs/parameters/parameters-dialog.component';

@Component({
  selector: 'app-analysis-editor',
  templateUrl: './analysis-editor.component.html',
  styleUrls: ['./analysis-editor.component.scss']
})
export class AnalysisEditorComponent implements OnInit {

	public analysis: Analysis;
	
  constructor(private as: AnalysisService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
		this.route.paramMap.subscribe((map: ParamMap) => {
      this.as.analysis$.subscribe(analysis => {
				this.analysis = analysis.find(a => a.id === map.get('analysisId'));
			})
    });
  }


	public addParameter() {
		let dialogRef = this.dialog.open(ParametersDialogComponent);

    dialogRef.afterClosed().subscribe((param: Parameter) => {
      if (param) {
				this.analysis.parameters.push(param);
				this.as.update(this.analysis);
      }
    });
	}

	public deleteParameter(pId: string, $event) {
		$event.stopPropagation();

		this.as.deleteParameter(this.analysis, pId);
	}

}
