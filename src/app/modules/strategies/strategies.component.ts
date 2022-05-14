import { LS_KEYS } from './../../types/ls-keys';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/ls';
import { StrategiesService } from './strategies.service';
import { Strategy } from 'src/app/types/strategy';
import { MatDialog } from '@angular/material/dialog';
import { StrategyDialogComponent } from 'src/app/components/dialogs/strategy/strategy-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm/confirm-dialog.component';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.scss'],
})
export class StrategiesComponent implements OnInit {
  public strategies: Strategy[];

  constructor(private ss: StrategiesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.ss.strategies$.subscribe((value) => {
      this.strategies = value;
    });
  }

  onAddStrategy() {
    let dialogRef = this.dialog.open(StrategyDialogComponent);

    dialogRef.afterClosed().subscribe((strategy: Strategy) => {
      this.ss.add(strategy);
    });
  }

  onDeleteStrategy(strategy: Strategy) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Strategy',
        message: `Are you sure you want to delete strategy ${strategy.name}`,
      },
    });
    dialogRef.afterClosed().subscribe((isUserAgree: boolean) => {
      if (isUserAgree) {
        this.ss.delete(strategy);
      }
    });
  }
}
