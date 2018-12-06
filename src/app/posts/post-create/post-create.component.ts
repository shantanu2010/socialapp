import { Component, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../post-service";

@Component({
    'selector':'app-post-create',
    'templateUrl':'./post-create.component.html',
    'styleUrls':['./post-create.component.css']
})
export class PostCreateComponent{

  enteredTitle:string='';
  enteredContent:string='';

  constructor(public postService:PostService){


  }
  onAddPost(Myform:NgForm){

    if(Myform.invalid){
      return;
    }
    this.postService.addPost(Myform.value.title,Myform.value.content);
    Myform.resetForm();
  }

}
