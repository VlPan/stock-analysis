import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatModule } from '../mat-module/mat-module';
import { StrategiesComponent } from './strategies.component';
import { StrategyDialogComponent } from 'src/app/components/dialogs/strategy/strategy-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: StrategiesComponent }]),
  ],
  declarations: [StrategiesComponent, StrategyDialogComponent],
})
export class StrategiesModule {}
