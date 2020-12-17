import { DateWiseData } from './../models/date-wise-data';
import { GlobalDataSummary } from './../models/global-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  country;
  constructor(private http : HttpClient) { }

  getGlobalData()
  {
    return this.http.get("http://localhost:5000/getGlobalData" ,{responseType:"text"}).pipe(
      map(result => {
        let data :GlobalDataSummary[] = [];
        let rows = result.split("\n");
        let raw = {};
        
        rows.splice(0,1)
        rows.forEach(row =>{
          let cols = row.split(/,(?=\S)/);
          
          let cs = {
            country : cols[3],
            confirmed: +cols[7],
            deaths:+cols[8],
            recovered:+cols[9],
            active:+cols[10]
          };
          let temp : GlobalDataSummary = raw[cs.country];
          if(temp)
          {
            
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;
            raw[cs.country] = temp;
           

          }else 
          {
            raw[cs.country] = cs;
          }

          
          
        })
        

        return <GlobalDataSummary[]>Object.values(raw);
      })

    )
  }

  getCountryData()
  {
    return this.http.get(`http://localhost:5000/countries` ,{responseType:"text"})
    .pipe(map(result => {
      let data :DateWiseData[] = [];
      let rows = result.split('\n')
      let mainData= {};
      let header = rows[0];
      let dates = header.split(/,(?=\S)/);
      
      dates.splice(0,4)
      rows.splice(0,1)
     
      rows.forEach(row => {
        let cols = row.split(/,(?=\S)/);
        let con = cols[1];
        cols.splice(0,4);
        mainData[con] = [];
        cols.forEach((value ,index) => {
          let datewise :DateWiseData = {
            cases : +value, 
            country :con,
            date : new Date(Date.parse(dates[index]))

          }
          mainData[con].push(datewise);
        })
        

      })
      //console.log(mainData)
      return mainData;
    }))
    
  }
}
