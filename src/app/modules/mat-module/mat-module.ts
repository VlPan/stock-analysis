import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
		MatInputModule,
		MatIconModule
  ],
	declarations: [ConfirmDialogComponent],
  exports: [
    MatSliderModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		ConfirmDialogComponent
  ],
})
export class MatModule {}
