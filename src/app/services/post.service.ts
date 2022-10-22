import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "https://winku-social-network-server.herokuapp.com/winku/api/v1";

  constructor( private http : HttpClient) {}
  uploadPost(formData : FormData) {
    return this.http.post(this.url +"/posts",formData,{
      reportProgress : true,
      observe : 'events'
    })
  }
}
