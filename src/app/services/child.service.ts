import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {ChildRegister} from '../models/childRegister';
import {ResponseModel} from '../models/responseModel';
import {Child} from '../models/child';
import {SingleResponseModel} from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  apiUrl="https://localhost:44356/api/Child"

  constructor(private httpClient:HttpClient) { }

  getChildByParentId(parentId:number):Observable<ListResponseModel<Child>>{
    return this.httpClient.get<ListResponseModel<Child>>(this.apiUrl+'/GetChildByParentId?parentId='+parentId);
  }

  childRegister(childRegister:ChildRegister):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/ChildRegister",childRegister);
  }

  getChildById(id:number):Observable<SingleResponseModel<Child>>{
    return this.httpClient.get<SingleResponseModel<Child>>(this.apiUrl+"/GetDetailsById?id="+id);
  }
}
