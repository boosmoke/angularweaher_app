import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherCell } from '../../models/weather-cell';
import { WeatherService } from '../../services/weather.service';
import { WeatherDataComponent } from '../weather-data/weather-data.component';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {

  @Input() weatherData:WeatherCell[];
  constructor(private weatherService:WeatherService, private router:Router, private weatherDataComponent:WeatherDataComponent) {
    
   }

  ngOnInit() {
    
  }


  removeCity(index){
    if(index > -1){
      this.weatherData.splice(index, 1);
      localStorage.setItem('weather', JSON.stringify(this.weatherData))
      
    }
  }


  getObj(weather){
    console.log(weather);
    this.router.navigate(['/weather-details', weather.cityName]);
  }

}
