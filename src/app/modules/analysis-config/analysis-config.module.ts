import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisConfigComponent } from './analysis-config.component';
import { RouterModule } from '@angular/router';
import { MatModule } from '../mat-module/mat-module';

@NgModule({
  imports: [
    CommonModule,
	MatModule,
	RouterModule.forChild([{ path: '', component: AnalysisConfigComponent }])
  ],
  declarations: [AnalysisConfigComponent]
})
export class AnalysisConfigModule { }
