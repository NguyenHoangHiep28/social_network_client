import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = "https://winku-social-network-server.herokuapp.com/winku/api/v1";

  constructor(private http:HttpClient) { }
  login(credential : object) {
    return this.http.post(this.url + "/login", JSON.stringify(credential), {
      headers :{
        'Content-Type': 'application/json'
      },observe : "response",withCredentials: true
    });
  }
  
  register(credetial: object) {
    return this.http.post(this.url + '/register', JSON.stringify(credetial), {
      headers: {
        'Content-Type': 'application/json',
      },
      observe: 'response',
      withCredentials: true,
    });
  }
}
