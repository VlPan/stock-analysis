import { ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './../mat-module/mat-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisEditorComponent } from './analysis-editor.component';
import { RouterModule } from '@angular/router';
import { ParametersDialogComponent } from 'src/app/components/dialogs/parameters/parameters-dialog.component';

@NgModule({
  imports: [
    CommonModule,
		MatModule,
		ReactiveFormsModule,
		RouterModule.forChild([
      {
        path: '',
        component: AnalysisEditorComponent,
      },
    ]),
  ],
  declarations: [AnalysisEditorComponent, ParametersDialogComponent]
})
export class AnalysisEditorModule { }
