import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const routes:Routes = [
  { path:"login", component:LoginComponent },
  { path:"signup", component:SignupComponent }
];

@NgModule({

  declarations:[],

  imports:[
    RouterModule.forChild(routes)
  ],

  exports:[RouterModule]

})
export class AuthRoutingModule{

}
