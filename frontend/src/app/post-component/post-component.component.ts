import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {

  public posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (results => this.posts = results),
      ((error: Error) => console.log(error))
    );
  }

  urlClick(url: string){
    var win = window.open(url, '_blank');
  }

  submitPost(title:string, url:string): void{
    let data : Post = {
      title: title,
      url: url,
      submit_date: new Date(),
      comments: []
    }
    this.postService.createPost(data).subscribe(
      null,
      (error: Error) => console.log(error),
      () => this.posts = this.posts.concat(data)
    );
  }

  deletePost(post: Post): void{
    this.postService.deletePost(post.id).subscribe(
      null,
      (error: Error) => console.log(error),
      () => this.posts.splice(this.posts.indexOf(post), 1)
    )
  }

  showComments(post: Post): void{
    console.log(post.show);
    if (post.show) {post.show = false; return;}
    else post.show = true;
    console.log(post);
    this.postService.getPost(post.id).subscribe(
      (res: Post) => {this.posts[this.posts.indexOf(post)] = res; console.log(res);},
      (error: Error) => console.log(error)
    )
  }

  submitComment(text: string, post: Post): void{
    this.postService.submitComment(text, post.id).subscribe(
      () => post.comments = this.posts[this.posts.indexOf(post)].comments.concat([{
        text: text,
        date_submitted: new Date()
      }]),
      (error: Error) => console.log(error),
    )
  }
}
