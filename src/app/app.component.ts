import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( public toastr : ToastsManager, public vcr:ViewContainerRef){
    this.toastr.setRootViewContainerRef(this.vcr);
  }
  ngOnInit(){

  }

}
