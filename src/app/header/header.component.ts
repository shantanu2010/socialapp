import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscribable, Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{

  userIsAuthenticated:boolean = false;
  private authListnerSubs:Subscription;

  constructor(private authService:AuthService){

  }

  ngOnInit(){

    this.authListnerSubs = this.authService.getAuthStatusListner()
                                           .subscribe(isAuthenticated=>{
                                             this.userIsAuthenticated = isAuthenticated;
                                           });

  }

  
  onSignOut(){
    this.authService.logout();

  }
  ngOnDestroy(){

    this.authListnerSubs.unsubscribe();

  }
}
