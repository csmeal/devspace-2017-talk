import { Injectable } from '@angular/core';
import { Post } from './post';
import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Rx'

import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  private apiBase: string = "/api/posts/";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getPosts(): Observable<Post[]> {
    return this.http.get(this.apiBase)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createPost(post: Post): Observable<void> {

    return this.http.post(this.apiBase, post, { headers: this.headers })
      .map(
      () => null
      );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get(this.apiBase + id, {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete(this.apiBase + id)
      .map(
      () => null
      );
  }

  submitComment(text: string, postId: number): Observable<void>{
    return this.http.post(this.apiBase + postId + '/comments', {text: text})
      .map(() => null)
  }

}
