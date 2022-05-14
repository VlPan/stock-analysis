import { Component } from '@angular/core';
import { ActivationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private router: Router) {
		this.router.events.subscribe((e) => {
			if(e instanceof ActivationEnd) {
				const fragments = this.router.url.split('/');
				this.activeLink = this.links.find(l => fragments.includes(l));
			}
		})
	}


  title = 'stock-analysis';
  links = ['stocks', 'strategies'];
  activeLink;
}
