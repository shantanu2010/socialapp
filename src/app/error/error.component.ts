import { Component } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  templateUrl:"./error.component.html"
})
export class ErrorComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string}){

  }
  message:string = "An unknown Error!";
}
