import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'stocks',
		pathMatch: 'full'
	},
  {
    path: 'strategies',
		loadChildren: () => import('./modules/strategies/strategies.module').then(m => m.StrategiesModule),
  },
	{
    path: 'strategies/:id',
		loadChildren: () => import('./modules/strategy-editor/strategy-editor.module').then(m => m.StrategyEditorModule),
  },
	{
    path: 'strategies/:strategyId/analysis/:analysisId',
		loadChildren: () => import('./modules/analysis-editor/analysis-editor.module').then(m => m.AnalysisEditorModule),
  },
  {
    path: 'stocks',
		loadChildren: () => import('./modules/stocks/stocks.module').then(m => m.StocksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
