import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forChild([{ path: '', component: StocksComponent }])
  ],
  declarations: [StocksComponent]
})
export class StocksModule { }
