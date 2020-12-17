import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalDeaths = 0;
  totalActive = 0;
  totalRecovered = 0;
  pieChart:GoogleChartInterface = {
    chartType:"PieChart"
  };

  
  globalData: GlobalDataSummary[] ;

  constructor(private Data : DataServiceService) { }


  intiChart()
  {
    let datatable = [];
    datatable.push(["Country", "Cases"]);
    console.log(this.globalData)
    this.globalData.forEach(cs =>{
      datatable.push([
        cs.country,cs.confirmed
      ])
    })
    
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      
      options: {
        height:500
      },
    };
  }

  ngOnInit(): void {
    this.Data.getGlobalData().subscribe({
      next : (result) => {
        
        this.globalData = result;
        result.forEach(cs => {
          if(!Number.isNaN(cs.confirmed)){
          this.totalActive+=cs.active;
          this.totalConfirmed+=cs.confirmed;
          this.totalDeaths+=cs.deaths;
          this.totalRecovered+=cs.recovered;
          }
        })
        
        console.log(result);
        this.intiChart();
      }
    })
  }

}
