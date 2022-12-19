import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }
  uploadPost(formData: FormData) {
    return this.http.post(this.url + "/posts", formData, {
      reportProgress: true,
      observe: 'events',
      withCredentials: true
    })
  }
}
