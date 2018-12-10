import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Post } from '../post.model'
import { PostsService } from "../post-service";

@Component({
  'selector':'app-post-list',
  'templateUrl':'./post-list.component.html',
  'styleUrls':['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{


  posts:Post[] = [];
  isLoading:boolean = false;

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

  onDelete(postId:string){

      this.postsService.deletePost(postId);

  }
  ngOnDestroy(){

    this.PostsSub.unsubscribe();
  }


}
