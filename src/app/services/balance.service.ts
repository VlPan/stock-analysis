import { Injectable } from '@angular/core';
import { BehaviorSubject, find, map, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/ls';
import { LS_KEYS } from 'src/app/types/ls-keys';
import { Strategy } from 'src/app/types/strategy';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private ls: LocalStorageService) {
    this.initLS();
  }

  set(balance: string) {
    this.ls.set(LS_KEYS.BALANCE, balance);
  }

	public get(): number{
    return this.ls.get(LS_KEYS.BALANCE);
  }

  private initLS() {
    if (!this.ls.get(LS_KEYS.BALANCE)) {
      this.ls.set(LS_KEYS.BALANCE, 0);
    }
  }
}
