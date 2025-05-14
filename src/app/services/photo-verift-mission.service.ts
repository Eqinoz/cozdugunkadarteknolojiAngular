import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {PhotoVerifyMission} from '../models/photoVerifyMission';
import {ResponseModel} from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PhotoVeriftMissionService {
apiUrl="https://localhost:44356/api/PhotoMission/"
  constructor(private httpClient:HttpClient) { }

  getMissionByChildId(id:number):Observable<ListResponseModel<PhotoVerifyMission>>{
  return  this.httpClient.get<ListResponseModel<PhotoVerifyMission>>(this.apiUrl+"GetDetailsByChildId?id="+id);
  }
  addMission(mission:PhotoVerifyMission):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"AddPhotoMission", mission);
  }
}
