import { LS_KEYS } from './../../types/ls-keys';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/ls';
import { Strategy } from 'src/app/types/strategy';
import { MatDialog } from '@angular/material/dialog';
import { StrategyDialogComponent } from 'src/app/components/dialogs/strategy/strategy-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm/confirm-dialog.component';
import { StrategiesService } from 'src/app/services/strategies.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.scss'],
})
export class StrategiesComponent implements OnInit {
  public strategies: Strategy[];
	public defaultStrategy;

  constructor(private ss: StrategiesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.ss.strategies$.subscribe((value) => {
      this.strategies = value;
    });

		this.defaultStrategy = this.ss.getDefaultStrategyId();
  }

  onAddStrategy() {
    let dialogRef = this.dialog.open(StrategyDialogComponent);

    dialogRef.afterClosed().subscribe((strategy: Strategy) => {
      if (strategy) {
        this.ss.add(strategy);
      }
    });
  }

  onDeleteStrategy(strategy: Strategy, $event) {
		$event.stopPropagation();
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

	makeDefault($event: MatCheckboxChange, strategy: Strategy) {
		if($event.checked) {
			this.defaultStrategy = strategy.id;
			this.ss.setDefaultStrategy(strategy.id)
		}
	}
}
