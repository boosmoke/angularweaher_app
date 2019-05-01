import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { ToolsService } from '../../services/tools.service';

//tempoerär
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-weather-hourly',
  templateUrl: './weather-hourly.component.html',
  styleUrls: ['./weather-hourly.component.css']
})
export class WeatherHourlyComponent implements OnInit {
  weatherHourly:any;
  weatherFirstDay:string;
  currentCity:string;
  sortedDays;
  constructor(private weatherService:WeatherService, private tools:ToolsService, private route:ActivatedRoute, private http: Http) {}

  ngOnInit() {
    //check localstorage, if null redirect to homepage
    if(this.tools.checkSessionStorage()){
      this.currentCity = this.tools.getSessionStorage().split(',');
      this.getHourlyWeather();
      //this.tools.backGroundChanger();
      this.tools.getCurrentDate();
      //this.locateHash();
      //temporär
        /* this.getJSON().subscribe(data => {
        this.weatherHourly=data; 
        console.log(data)
      }, 
        error => console.log(error),
        ()=>{
          this.sortDays(this.weatherHourly)
        }); */

    }
  }
  //using this to convert date in HTML to correct id
  convertDateId(date){
    return this.tools.convertDate(date);
  }
  getHourlyWeather(){
    this.weatherService.getWeatherData( this.currentCity[0], this.currentCity[1],true)
      .subscribe(
        data => {
            this.weatherHourly = data;
            this.weatherFirstDay = data.list[0].dt;
            console.log(data)
        },
        error => {console.log(error); return error;},
        () => {
          //when observable returns call sort function
          console.log("Request complete")
          this.sortDays(this.weatherHourly)
        },
      )
  }

  locateHash(){
    let currHash;
    this.route.fragment.subscribe((fragment:string)=>currHash = fragment);
    setTimeout(function() {
      location.href="https://boosmoke.github.io/weather-app/hourly#"+currHash;
    }, 300);
    
  }

  sortDays(weatherData){
    var arrList = weatherData.list;
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var res = arrList.reduce(function(res, currentValue) {
      var date = new Date((currentValue.dt*1000));
      var theDay = days[date.getDay()]+" "+date.getDate()+" "+months[date.getMonth()];
        if ( res.indexOf(theDay) === -1 ) {
          res.push(theDay);
        }
        return res;
      }, []).map(function(group) {
          return {
              name: group,
              date: arrList.filter(function(el) {
                var date = new Date((el.dt*1000));
                var theDay = days[date.getDay()]+" "+date.getDate()+" "+months[date.getMonth()];
                return theDay === group;
            }).map(function(el, index) { return el; })
          }
      });
      this.sortedDays = res;
      return res;
  }
  


  //////////////////////////TEMPORÄR

  public getJSON(): Observable<any> {
         return this.http.get("../../../assets/dummydata.json")
                         .map((res:any) => res.json())
                         .catch((error:any) => {return error});

     }

  

}
