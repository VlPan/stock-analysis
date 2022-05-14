import { Injectable } from '@angular/core';
import { BehaviorSubject, find, map, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/ls';
import { LS_KEYS } from 'src/app/types/ls-keys';
import { Strategy } from 'src/app/types/strategy';

@Injectable({
  providedIn: 'root',
})
export class StrategiesService {
  public strategies$: BehaviorSubject<Strategy[]> = new BehaviorSubject([]);

  constructor(private ls: LocalStorageService) {
    this.initLS();
		this.emit();
  }

  set(ss: Strategy[]) {
    this.ls.set(LS_KEYS.STRATEGIES, ss);
		this.emit();
  }

  add(s: Strategy) {
    const strategies = this.get();
    strategies.unshift(s);
    this.set(strategies);
  }

	getById(id: string) {
		return this.strategies$.value.find(s => s.id === id);
	}

	delete(s: Strategy) {
    const strategies = this.get();
    const index = strategies.findIndex(st => st.id === s.id);
		if(index > -1) {
			strategies.splice(index, 1);
		}
    this.set(strategies);
  }

	private get(): Strategy[] {
    return this.ls.get(LS_KEYS.STRATEGIES);
  }

  private initLS() {
    if (!this.ls.get(LS_KEYS.STRATEGIES)) {
      this.ls.set(LS_KEYS.STRATEGIES, []);
    }
  }

	private emit() {
		this.strategies$.next(this.ls.get(LS_KEYS.STRATEGIES));
	}
}
