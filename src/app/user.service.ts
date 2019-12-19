import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
public apiUrl = environment.apiUrl;
  token: string;
  headers: any;
  constructor(public http: HttpClient) { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
  }

  userregister(formvalue): Observable<any>{
    return this.http.post(this.apiUrl + 'register',formvalue,this.headers);
  }

  login(formValue): Observable<any>{
    return this.http.post(this.apiUrl + 'login',formValue,this.headers);
  }
}
