import { Analysis } from './../../types/analysis';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnalysisDialogComponent } from 'src/app/components/dialogs/analysis/analysis-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm/confirm-dialog.component';
import { StrategyDialogComponent } from 'src/app/components/dialogs/strategy/strategy-dialog.component';
import { Strategy } from 'src/app/types/strategy';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StrategiesService } from 'src/app/services/strategies.service';
import { AnalysisService } from 'src/app/services/analysis.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-strategy-editor',
  templateUrl: './strategy-editor.component.html',
  styleUrls: ['./strategy-editor.component.scss'],
})
export class StrategyEditorComponent implements OnInit {
  public strategy: Strategy;

  analysis: Analysis[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private ss: StrategiesService,
    private as: AnalysisService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((map: ParamMap) => {
      this.strategy = this.ss.getById(map.get('id'));

			this.as.analysis$.subscribe((a) => {
				this.analysis = a.filter(a => a.strategyId === this.strategy.id);
			})
    });
  }

  onAddAnalysis() {
    let dialogRef = this.dialog.open(AnalysisDialogComponent, {
			data: {
				strategyId: this.strategy.id
			}
		});

    dialogRef.afterClosed().subscribe((analysis: Analysis) => {
      if (analysis) {
				this.as.add(analysis);
      }
    });
  }

  onDeleteAnalysis(analysis: Analysis, $event) {
    $event.stopPropagation();
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Analysis',
        message: `Are you sure you want to delete analysis ${analysis.name}`,
      },
    });
    dialogRef.afterClosed().subscribe((isUserAgree: boolean) => {
      if (isUserAgree) {
				this.as.delete(analysis);
      }
    });
  }

	createAnalysisEditorLink(analysisId: string) {
		return `analysis/${analysisId}`
	}
}
