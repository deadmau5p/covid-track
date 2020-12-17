import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import {HttpClientModule} from "@angular/common/http";
import { DashboardConComponent } from './components/dashboard-con/dashboard-con.component'


const routes: Routes = [
  {path: '' , component :HomeComponent},
  {path: 'countries' ,component:CountriesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardConComponent
    
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes) ,HttpClientModule, Ng2GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
