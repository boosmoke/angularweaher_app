import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';

//third party vendor
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomToastrOptions } from '../assets/custom-toastr-options';


import { AppComponent } from './app.component';
import { WeatherService } from './services/weather.service';
import { ToolsService } from './services/tools.service'
import { WeatherDataComponent } from './components/weather-data/weather-data.component';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { WeatherHourlyComponent } from './components/weather-hourly/weather-hourly.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherDataComponent,
    WeatherListComponent,
    WeatherDetailsComponent,
    WeatherHourlyComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [WeatherService, {provide: ToastOptions, useClass: CustomToastrOptions}, DatePipe, ToolsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
