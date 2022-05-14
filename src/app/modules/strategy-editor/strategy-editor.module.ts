import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from './../mat-module/mat-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyEditorComponent } from './strategy-editor.component';
import { AnalysisDialogComponent } from 'src/app/components/dialogs/analysis/analysis-dialog.component';

@NgModule({
  imports: [
    CommonModule,
		MatModule,
		ReactiveFormsModule,
		RouterModule.forChild([
      {
        path: '',
        component: StrategyEditorComponent,
      },
    ]),
  ],
  declarations: [StrategyEditorComponent, AnalysisDialogComponent]
})
export class StrategyEditorModule { }
