import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'analysis-config',
		pathMatch: 'full'
	},
  {
    path: 'analysis-config',
	loadChildren: () => import('./modules/analysis-config/analysis-config.module').then(m => m.AnalysisConfigModule),
	// pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
