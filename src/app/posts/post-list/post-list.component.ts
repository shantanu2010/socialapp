import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Post } from '../post.model'
import { PostService } from "../post-service";

@Component({
  'selector':'app-post-list',
  'templateUrl':'./post-list.component.html',
  'styleUrls':['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{


  posts:Post[] = [];

  private PostsSub:Subscription;


  constructor(public postsService:PostService){

  }

  ngOnInit(){

      this.posts = this.postsService.getPost();
      this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{this.posts = posts;});

  }

  ngOnDestroy(){

    this.PostsSub.unsubscribe();
  }


}
