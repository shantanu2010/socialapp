import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

const routes:Routes = [

  { path : 'create' ,component:PostCreateComponent },
  { path : 'edit/:postId' ,component:PostCreateComponent},
  { path : '' , component:PostListComponent}
]
@NgModule({

  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}
