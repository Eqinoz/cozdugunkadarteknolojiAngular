import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QuestionMission} from '../models/questionMission';
import {Observable} from 'rxjs';
import {ResponseModel} from '../models/responseModel';
import {ListResponseModel} from '../models/listResponseModel';
import {QuestionMissionDTO} from '../models/questionMissionDTO';

@Injectable({
  providedIn: 'root'
})
export class QuestionMissionService {
apiUrl="https://localhost:44356/api/QuestionMission/"
  constructor(private httpClient:HttpClient) { }

  addMisson(question:QuestionMission):Observable<ResponseModel>{
    return  this.httpClient.post<ResponseModel>(this.apiUrl+"Add", question);
  }
  getMissionByChildId(id:number):Observable<ListResponseModel<QuestionMission>>{
    return this.httpClient.get<ListResponseModel<QuestionMission>>(this.apiUrl+"GetDetailsByChildId?id="+id);
  }

  getMissionDetailByChildId(id:number):Observable<ListResponseModel<QuestionMissionDTO>>{
  return this.httpClient.get<ListResponseModel<QuestionMissionDTO>>(this.apiUrl+"GetDetailsByChildId?id="+id);
  }
  getMissionById(id:number):Observable<ListResponseModel<QuestionMissionDTO>>{
  return this.httpClient.get<ListResponseModel<QuestionMissionDTO>>(this.apiUrl+"GetDetailsByMissionId?id="+id);
  }

  changeMissionStatus(id:number):Observable<ResponseModel>{
  return this.httpClient.get<ResponseModel>(this.apiUrl+"UpdateStatus?id="+id);
  }
}
