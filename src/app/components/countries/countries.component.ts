import { GoogleChartInterface } from 'ng2-google-charts';
import { DateWiseData } from './../../models/date-wise-data';
import { DashboardConComponent } from './../dashboard-con/dashboard-con.component';
import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit, ɵConsole } from '@angular/core';



@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  globalData: GlobalDataSummary[];
  country :string = '';
  selectedCountryData :DateWiseData[] = [];
  countries :string [] = [];
  lineChart : GoogleChartInterface = {
    chartType :"LineChart"
  }
  countryData ;

  totalActive =0;
  totalRecovered = 0;
  totalDeaths = 0;
  totalConfirmed = 0;

  constructor(private Data :DataServiceService) { }

  ngOnInit(): void {
    this.Data.getCountryData().subscribe(result => {
      this.countryData = result;
      
    })


    this.Data.getGlobalData().subscribe(result =>{
      this.globalData = result;
      this.globalData.forEach(cs => {
        this.countries.push(cs.country);
        
      })
    })


  }


  updateChart()
  {
    console.log("heej")
    let dataTable = [];
    dataTable.push(['Date', 'Cases']);
   
    this.selectedCountryData.forEach(cs => {
      
      dataTable.push([cs.date, cs.cases])
    });

    this.lineChart = {
      chartType:"LineChart",
      dataTable :dataTable,
      options: {
        height : 500
      }
    }
  }


  changeCountry(event)
  {
    this.country = event;
    this.totalActive = 0;
    this.totalConfirmed = 0;
    this.totalDeaths = 0;
    this.totalRecovered = 0;
    for(let i  = 0; i  < this.globalData.length;i++)
    {
      if(this.globalData[i].country === this.country)
      {
        this.totalActive += this.globalData[i].active;
        this.totalRecovered += this.globalData[i].recovered;
        this.totalDeaths += this.globalData[i].deaths;
        this.totalConfirmed += this.globalData[i].confirmed;
      }
    }

    
    this.selectedCountryData = <DateWiseData[]>this.countryData[this.country];
    this.updateChart()
    //console.log(this.selectedCountryData);
    
    
  }

}
