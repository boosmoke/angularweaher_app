import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { ToolsService } from '../../services/tools.service';
import { WeatherCell, WeatherCellDetail } from '../../models/weather-cell';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit { 
  WEATHER_DATA:WeatherCell[] = [ ];
  dataSearch:any = [];
  metric:string = 'metric';
  celcius:boolean = true;
  weatherData:any;
  searchForm:FormGroup;
  cityLocation;
//to catch entire input element if needed
  //@ViewChild("input") public searchInput: ElementRef;

  constructor(private weatherService: WeatherService, public tools: ToolsService){
    
  }

  ngOnInit(){
    //console.log(this.searchInput.nativeElement);
    this.setWeatherDataToLocalStorage();
    this.WEATHER_DATA = this.setWeatherDataToLocalStorage();
    //this.tools.backGroundChanger();
  }

setWeatherDataToLocalStorage(){
    //if statement checks that localstorage is not empty, if it is empty it will equal null
    //and we can't append new objects to null, WEATHER_DATA needs to be empty array
    if(JSON.parse(localStorage.getItem('weather')) !== null){
      return JSON.parse(localStorage.getItem('weather'));
    }
    return [];
  }

  switchMetric(metric):void{
    metric ? this.metric = 'metric' : this.metric = 'imperial'
    this.celcius = !this.celcius;
  }

  getWeather(cityQuery:string, metric:string){
    this.weatherService.getWeatherData(cityQuery, metric, false/*false is for type of weather, false is forecast true is hourly*/)
      //.delay(300)
      .subscribe(
        data => {
            this.displaySearchResult(data, metric)
            ///////////////TOASTER /////////////////
        },
        error => {
          console.log(error);
          this.tools.toastMessage('error', 'Sorry city could not be found, try again')
        },
        () => console.log("Request complete"),
      )
  }
  //Load example list
  loadSampleData(){
    this.weatherService.getWeatherData('Stockholm', 'metric', false)
      .subscribe(data => {this.addItemToList(data)},
        error => console.log(error));
    this.weatherService.getWeatherData('Berlin', 'metric', false)
      .subscribe(data => {this.addItemToList(data)},
        error => console.log(error));
    this.weatherService.getWeatherData('Los Angeles', 'metric', false)
      .subscribe(data => {this.addItemToList(data)},
        error => console.log(error));
  }
  //displays search result before adding to list
  displaySearchResult(data:any, metric:string){
    if(this.dataSearch.length > 0){
      this.dataSearch = [];
    }
    this.dataSearch.push(data);
    this.dataSearch.push(metric);
  }
  //add item to WEATHER_DATA and localstorage
  addItemToList(data){
    this.createWeatherCell(data);
    this.dataSearch = [];
    this.WEATHER_DATA = JSON.parse(localStorage.getItem('weather'));
  }
  //create weathercell which also checks that one with same cityName does not already exist
  createWeatherCell(data:any){
    const weatherCell = new WeatherCell(+data.city.id ,data.city.name,data.city.country, this.metric, data.list)
    console.log(weatherCell);
    if(this.weatherService.findIndexOfAttribute(this.WEATHER_DATA, 'cityName', data.city.name) === -1){
      this.weatherService.saveDataToLocalStorage(weatherCell)
      this.tools.toastMessage('success', 'SUCCESSFULLY ADDED ITEM TO LIST')
      return;
    }
    ///////////////TOASTER /////////////////
    this.tools.toastMessage('error', 'CITY ALREADY IN LIST');
    return false;
  }
  //Submit form with search values
  onSubmit(form: FormGroup){
    document.getElementById('search-weather').classList.remove('open');
    this.getWeather(form.value.cityLocation, this.metric);
  }
  refreshWeather(){
      this.upDateGet(this.weatherService.updateWeather).then((data)=>{
        localStorage.setItem('weather', JSON.stringify(data))
        console.log('updated weather')
        this.tools.toastMessage('success', 'UPDATED WEATHER')
      });
  }

  clearLocalStorage(){
    localStorage.clear();
    this.WEATHER_DATA = [];
  }

  upDateGet(get){
    let weatherData:WeatherCell[] = this.WEATHER_DATA.slice()
    let updatedWeatherData = 0;
    let grab = get;
    return new Promise(function(resolve, reject){
      weatherData.forEach((element,index) => {
        grab(element.cityName, element.measure)
        .then((data)=>{
          weatherData[index].weatherForecast = data.list;
          updatedWeatherData++;
          if(updatedWeatherData === weatherData.length){
            resolve(weatherData)
          }
        })  
      });
    })
  }

 //focus in
 focusInHandler(){
  document.getElementById('search-weather').classList.add('open');
 }
 //focus out
 focusOutHandler(){
  document.getElementById('search-weather').classList.remove('open');
 }
}



 