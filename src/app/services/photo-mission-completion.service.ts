import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PhotoMissionCompletion} from '../models/PhotoMissionCompletion';
import {Observable} from 'rxjs';
import {ResponseModel} from '../models/responseModel';
import {SingleResponseModel} from '../models/singleResponseModel';
import {PhotoMissionCompletionDTO} from '../models/PhotoMissionCompletionDTO';
import {ListResponseModel} from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PhotoMissionCompletionService {
  apiUrl="https://localhost:44356/api/PhotoMissionCompletion/";

  constructor(private httpClient: HttpClient) { }

  completionMission(photoMission:PhotoMissionCompletion):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Add",photoMission);
  }
  uploadMissionPhoto(formData:FormData):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"UploadMissionPhoto",formData);
  }

  getCompletionMissionByChildId(id:number):Observable<ListResponseModel<PhotoMissionCompletionDTO>>{
    return this.httpClient.get<ListResponseModel<PhotoMissionCompletionDTO>>(this.apiUrl+"GetAllDetailsByChildId?id="+id)
  }

  getCompletionMissionByMissionId(id:number):Observable<SingleResponseModel<PhotoMissionCompletionDTO>>{
    return this.httpClient.get<SingleResponseModel<PhotoMissionCompletionDTO>>(this.apiUrl+"GetByMissionId?id="+id)
  }

}
