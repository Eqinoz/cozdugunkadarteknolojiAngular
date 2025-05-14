import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SingleResponseModel} from '../models/singleResponseModel';
import {ListResponseModel} from '../models/listResponseModel';
import {Lesson} from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  apiUrl="https://localhost:44356/api/SchoolLesson/"

  constructor(private httpClient: HttpClient) { }

  getLessonBySchoolId(lessonId:number):Observable<ListResponseModel<Lesson>>{
    return this.httpClient.get<ListResponseModel<Lesson>>(this.apiUrl+"GetSchoolId?id="+lessonId);

  }
  getLessonBySchoolName(lessonName:string):Observable<ListResponseModel<Lesson>>{
    return this.httpClient.get<ListResponseModel<Lesson>>(this.apiUrl+"GetLessonBySchoolName?schoolName="+lessonName);
  }
}
