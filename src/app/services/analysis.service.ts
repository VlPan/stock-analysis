import { Injectable } from '@angular/core';
import { BehaviorSubject, find, map, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/ls';
import { LS_KEYS } from 'src/app/types/ls-keys';
import { Analysis } from '../types/analysis';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  public analysis$: BehaviorSubject<Analysis[]> = new BehaviorSubject([]);

  constructor(private ls: LocalStorageService) {
    this.initLS();
		this.emit();
  }

  set(ss: Analysis[]) {
    this.ls.set(LS_KEYS.ANALYSIS, ss);
		this.emit();
  }

  add(s: Analysis) {
    const analysis = this.get();
    analysis.unshift(s);
    this.set(analysis);
  }

	update(a: Analysis) {
		const analysis = this.get();
		const index = analysis.findIndex(an => an.id === a.id)
		analysis[index] = a;
		this.set(analysis);
	}

	deleteParameter(a: Analysis, pId: string) {
		const analysis = this.get();
		const index = analysis.findIndex(an => an.id === a.id)
		const paramIndex = analysis[index].parameters.findIndex(p => p.id === pId);

		analysis[index].parameters.splice(paramIndex, 1);
		this.set(analysis);
	}

	getById(id: string) {
		return this.analysis$.value.find(s => s.id === id);
	}

	getByStrategyId(id: string) {
		return this.analysis$.value.filter(a => a.strategyId === id);
	}

	delete(s: Analysis) {
    const analysis = this.get();
    const index = analysis.findIndex(st => st.id === s.id);
		if(index > -1) {
			analysis.splice(index, 1);
		}
    this.set(analysis);
  }

	private get(): Analysis[] {
    return this.ls.get(LS_KEYS.ANALYSIS);
  }

  private initLS() {
    if (!this.ls.get(LS_KEYS.ANALYSIS)) {
      this.ls.set(LS_KEYS.ANALYSIS, []);
    }
  }

	private emit() {
		this.analysis$.next(this.ls.get(LS_KEYS.ANALYSIS));
	}
}
