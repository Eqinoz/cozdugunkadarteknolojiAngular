import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QuestionMission} from '../models/questionMission';
import {Observable} from 'rxjs';
import {ResponseModel} from '../models/responseModel';
import {ListResponseModel} from '../models/listResponseModel';

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
}
