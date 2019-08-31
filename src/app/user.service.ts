import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import{UserCredentials} from './models/user-credentials';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string="http://localhost:54768/api/Account/";

  constructor(private httpClient:HttpClient) { }

 public loginUser(credentials:UserCredentials){
      return this.httpClient.post(`${this.baseUrl}login`, credentials)
  }

  public isLoggedIn(){
    return localStorage.getItem('token')!=null;
  }
}
