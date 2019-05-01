import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  weatherObj:any;
  searchTerm:string;
  currentDetail:any = {};
  weatherDays:any;
  imperialMeasure:string;
  constructor(private route:ActivatedRoute, private router: Router, private tools:ToolsService) { 
    this.searchTerm = route.snapshot.params['searchTerm'];
  }

  ngOnInit() {
    //check localstorage, if null redirect to homepage
    if(this.tools.checkSessionStorage()){
      this.weatherObj = JSON.parse(localStorage.getItem('weather'));
      this.getWeatherDetails(this.searchTerm);
      this.weatherDays = this.currentDetail.weatherForecast;
      this.imperialMeasure = this.weatherObj[0].measure;
      this.tools.setSessionStorage(this.searchTerm, this.imperialMeasure);
      this.tools.toastMessage('warning', 'GOT WEATHERFORECAST');
      //this.tools.backGroundChanger();
    }
  }
  //ngAfterViewInit waits for document to be loaded
  ngAfterViewInit(){
    //this.weatherDetailAnimation(1000);
  }

  getWeatherDetails(searchTerm){
    this.weatherObj.forEach(element => {
      if(element.cityName === searchTerm){
        return this.currentDetail = element;
      }
      return false;
    });
  }

  //convert date and then go to hourly with ending #hashdate
  hourly(i, dateString){
    if(i < 5){
      var hash = this.tools.convertDate(dateString);
      //console.log(hash);
      this.router.navigate(['hourly'], {fragment: hash});
    }
    
  }
 /*  //animate elements to fly in
  weatherDetailAnimation(delay){
      let elements = document.getElementsByClassName("weather-details");
      let arr = [];
      for(var i = 0; i < elements.length; i++){
        arr.push(elements[i])
      }
      setTimeout(function() {
        arr.forEach((element, index) => {
          setTimeout(()=>{
            element.classList.add('bounceInRight')
          },70 * index)
        });
      }, delay);
      return;
  } */

}
