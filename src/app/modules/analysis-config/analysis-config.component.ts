import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/ls';

@Component({
  selector: 'app-analysis-config',
  templateUrl: './analysis-config.component.html',
  styleUrls: ['./analysis-config.component.scss']
})
export class AnalysisConfigComponent implements OnInit {

  constructor(private ls: LocalStorageService) { }

  ngOnInit() {
	  this.ls.set('analysis', [])
  }

}
