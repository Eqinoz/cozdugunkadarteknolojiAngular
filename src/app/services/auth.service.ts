import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../models/loginModel';
import {Observable} from 'rxjs';
import {SingleResponseModel} from '../models/singleResponseModel';
import {TokenModel} from '../models/tokenModel';
import {ParentRegisterModel} from '../models/parentRegisterModel';
import {ResponseModel} from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44356/api/Auth/';
  rediractUrl:string;

  constructor(private httpClient: HttpClient) { }

  loginParent(login:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"loginParent", login);
  }

  registerParent(register:ParentRegisterModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"registerParent", register);
  }

  isAuthenticated(){
    const token = localStorage.getItem('token');
    return !!token;
  }
}
