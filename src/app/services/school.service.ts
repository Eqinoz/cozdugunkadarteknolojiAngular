import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {School} from '../models/educationStatu';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  apiUrl = 'https://localhost:44356/api/School/';

  constructor(private http: HttpClient) { }

  getSchool():Observable<ListResponseModel<School>>{
    return this.http.get<ListResponseModel<School>>(this.apiUrl);
  }
}
