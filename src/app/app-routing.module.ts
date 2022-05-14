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
    path: 'stocks',
	loadChildren: () => import('./modules/stocks/stocks.module').then(m => m.StocksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
