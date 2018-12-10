import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Post } from '../post.model'
import { PostsService } from "../post-service";
import { PageEvent } from "@angular/material";

@Component({
  'selector':'app-post-list',
  'templateUrl':'./post-list.component.html',
  'styleUrls':['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{


  posts:Post[] = [];
  isLoading:boolean = false;
  totalPosts:number = 10;
  postsPerPage:number = 2;
  pageSizeOptions = [1,2,5,10];

  private PostsSub:Subscription;


  constructor(public postsService:PostsService){

  }

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.PostsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts:Post[])=>{this.isLoading = false;
                this.posts = posts;});

  }

  onChangedPage(pageData:PageEvent){

    
  }

  onDelete(postId:string){

      this.postsService.deletePost(postId);

  }
  ngOnDestroy(){

    this.PostsSub.unsubscribe();
  }


}
