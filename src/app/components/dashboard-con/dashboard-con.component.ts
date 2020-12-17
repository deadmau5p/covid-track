import { GoogleChartInterface, Ng2GoogleChartsModule } from 'ng2-google-charts';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-con',
  templateUrl: './dashboard-con.component.html',
  styleUrls: ['./dashboard-con.component.css']
})
export class DashboardConComponent implements OnInit {

  

  @Input() totalActive;
  @Input() totalRecovered;
  @Input() totalDeaths;
  @Input() totalConfirmed;

  constructor() { }

  ngOnInit(): void {
  }

}
