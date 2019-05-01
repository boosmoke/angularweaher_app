import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
/*import 'rxjs/add/operator/map';*/
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable()
export class WeatherService {

  constructor(private http:Http) { }

  getWeatherData(cityName:string, metric:string, urlType){
    let url = this.weatherUrl(urlType, cityName, metric)
//NORMAL http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&cnt=5&APPID=APIKEY
// 7 DAY FORECAST // http://api.openweathermap.org/data/2.5/forecast/daily?q="+cityName"&units=metric&cnt=7&APPID=APIKEY
    return this.http.get(url)
      .map((res:Response) => res.json())
      .catch(error => {
        console.error(error);
        return Observable.throw(error.json())
      })

  }

  updateWeather = function(city, metric){
    return new Promise(function(resolve, reject){
      fetch("https://api.openweathermap.org/data/2.5/forecast/daily?APPID="+environment.API_KEY+"&q="+city+"&units="+metric+"&cnt=16").then((response) => {
        resolve(response.json())
      })/*.then((data) => {
        return data;
      })*/.catch((error) => {
        console.error('Could not get city ', error);
      });
    })
  }


  weatherUrl(hourly, cityName, metric){
    if(hourly){
      return "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units="+metric+"&appid="+environment.API_KEY;
    }else{
      return "https://api.openweathermap.org/data/2.5/forecast/daily?APPID="+environment.API_KEY+"&q="+cityName+"&units="+metric+"&cnt=16"
    }
  }


  //function finds attrbitue with value in array, returns index in array or -1 if not present
  //array to search//attribute in object//value to find
  findIndexOfAttribute(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
  }

  saveDataToLocalStorage(data){
    var a = [];
    // Parse the serialized data back into an aray of objects
    //if statement checks that localstorage is not empty, if it is empty it will equal null
    if(JSON.parse(localStorage.getItem('weather'))!==null){
      a = JSON.parse(localStorage.getItem('weather'));
    }
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value
    //alert(a);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('weather', JSON.stringify(a));
  }

  

}
