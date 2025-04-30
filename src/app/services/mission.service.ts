import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {MissionType} from '../models/missionType';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  apiUrl="https://localhost:44356/api/MissionType";

  constructor(private http:HttpClient) { }

  getMissionType():Observable<ListResponseModel<MissionType>>{
    return this.http.get<ListResponseModel<MissionType>>(this.apiUrl);
  }
}
