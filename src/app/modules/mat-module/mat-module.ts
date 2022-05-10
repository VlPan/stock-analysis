import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
	MatSliderModule,
	MatTabsModule,
	MatButtonModule
  ],
  exports: [
	MatSliderModule,
	MatTabsModule,
	MatButtonModule
  ]
})
export class MatModule { }
