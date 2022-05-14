import { Injectable } from '@angular/core';
import { BehaviorSubject, find, map, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/ls';
import { LS_KEYS } from 'src/app/types/ls-keys';
import { Analysis } from '../types/analysis';

@Injectable({
  providedIn: 'root',
})
export class SecuritiesIncludedInAnalysis {
  public included$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private ls: LocalStorageService) {
    this.initLS();
    this.emit();
  }

  set(ss: string[]) {
    this.ls.set(LS_KEYS.INCLUDED_IN_ANALYSIS, ss);
    this.emit();
  }

  add(s: string) {
    const included = this.get();
    included.unshift(s);
    this.set(included);
  }

  update(a: string) {
    const included = this.get();
    const index = included.findIndex((an) => an === a);
    included[index] = a;
    this.set(included);
  }


  delete(id: string) {
    const included = this.get();
    const index = included.findIndex((st) => st === id);
    if (index > -1) {
      included.splice(index, 1);
    }
    this.set(included);
  }

  private get(): string[] {
    return this.ls.get(LS_KEYS.INCLUDED_IN_ANALYSIS);
  }

  private initLS() {
    if (!this.ls.get(LS_KEYS.INCLUDED_IN_ANALYSIS)) {
      this.ls.set(LS_KEYS.INCLUDED_IN_ANALYSIS, []);
    }
  }

  private emit() {
    this.included$.next(this.ls.get(LS_KEYS.INCLUDED_IN_ANALYSIS));
  }
}
