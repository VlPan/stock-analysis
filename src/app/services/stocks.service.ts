import { Injectable } from '@angular/core';
import { BehaviorSubject, find, map, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/ls';
import { LS_KEYS } from 'src/app/types/ls-keys';
import { Analysis } from '../types/analysis';
import { AnalysisInputs, Stock } from '../types/stock';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  public stocks$: BehaviorSubject<Stock[]> = new BehaviorSubject([]);

  constructor(private ls: LocalStorageService) {
    this.initLS();
    this.emit();
  }

  set(ss: Stock[]) {
    this.ls.set(LS_KEYS.SECURITIES, ss);
    this.emit();
  }

  add(s: Stock) {
    const stocks = this.get();
    stocks.unshift(s);
    this.set(stocks);
  }

  update(a: Stock) {
    const stocks = this.get();
    const index = stocks.findIndex((an) => an.id === a.id);
    stocks[index] = a;
    this.set(stocks);
  }

  // deleteStock(a: Stock, pId: string) {
  // 	const analysis = this.get();
  // 	const index = analysis.findIndex(an => an.id === a.id)
  // 	const paramIndex = analysis[index].parameters.findIndex(p => p.id === pId);

  // 	analysis[index].parameters.splice(paramIndex, 1);
  // 	this.set(analysis);
  // }

  getById(id: string) {
    return this.stocks$.value.find((s) => s.id === id);
  }

  delete(s: Stock) {
    const stocks = this.get();
    const index = stocks.findIndex((st) => st.id === s.id);
    if (index > -1) {
      stocks.splice(index, 1);
    }
    this.set(stocks);
  }

  calculateResult(strategyId: string, analysisInput: AnalysisInputs, analysis: Analysis[]) {
		let totalScore = 0;
    for (const ana of analysis) {

			let anaResult = 0;
			let maxResult = 0, currentResult = 0;

      for (const param of ana.parameters) {
				const value = analysisInput[strategyId][ana.id][param.id];
				const max = param.max;
				const weigh = param.weight;

				const maxValue = max * weigh;
				const currentValue = value * weigh;

				maxResult += maxValue;
				currentResult += currentValue;

      }
			
			anaResult = (currentResult / maxResult) * 100 * ana.weight;
			totalScore += anaResult;
    }

		return totalScore;
  }

  private get(): Stock[] {
    return this.ls.get(LS_KEYS.SECURITIES);
  }

  private initLS() {
    if (!this.ls.get(LS_KEYS.SECURITIES)) {
      this.ls.set(LS_KEYS.SECURITIES, []);
    }
  }

  private emit() {
    this.stocks$.next(this.ls.get(LS_KEYS.SECURITIES));
  }
}
