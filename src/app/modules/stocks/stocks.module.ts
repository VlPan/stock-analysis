import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './../mat-module/mat-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks.component';
import { RouterModule } from '@angular/router';
import { AddStockDialogComponent } from 'src/app/components/dialogs/add-stock/add-stock-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    RouterModule.forChild([{ path: '', component: StocksComponent }]),
		ReactiveFormsModule,
		FormsModule
  ],
  declarations: [StocksComponent, AddStockDialogComponent],
})
export class StocksModule {}
