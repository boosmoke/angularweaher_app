import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToolsService {

  constructor(private datePipe:DatePipe, public toastr: ToastsManager, private router:Router) { }


  convertDate(date:number){
    return this.datePipe.transform((date*1000), 'dd/MM/yyyy').split("/").join("-");
  }

  checkSessionStorage(){
    let storage = JSON.parse(localStorage.getItem('weather'));
    if(storage === null){
      this.router.navigate(['/dashboard']);
      return false;
    }else{
      return true;
    }
  }

  setSessionStorage(data1, data2){
    let data = data1+","+data2;
    sessionStorage.setItem("currentCity",JSON.stringify(data));
  }

  getSessionStorage(){
    return JSON.parse(sessionStorage.getItem("currentCity"));
  }

  setWeatherDataToLocalStorage(){
    //if statement checks that localstorage is not empty, if it is empty it will equal null
    //and we can't append new objects to null, WEATHER_DATA needs to be empty array
    if(JSON.parse(localStorage.getItem('weather')) !== null){
      return JSON.parse(localStorage.getItem('weather'));
    }
    return null;
  }

  getCurrentDate(){
    var rightNow = new Date();
    var res = rightNow.toISOString().slice(0,10);
  }

  toastMessage(type, msg) {
    switch (type) {
      case 'success':
        this.toastr.success(msg);
        break;
      case 'info':
        this.toastr.info(msg);
        break;
      case 'error':
        this.toastr.error(msg);
        break;
      case 'warning':
        this.toastr.warning(msg);
        break;
      default:
        this.toastr.success(msg);
        break;
    }
  }

  backGroundChanger(){
    var imgs = ["bg1.jpeg", "bg2.jpeg", "bg3.jpeg"];
    var randImg = imgs[(Math.floor(Math.random() * 3))]
    document.body.style.backgroundImage = "url(assets/img/"+randImg+")";
  }

}
