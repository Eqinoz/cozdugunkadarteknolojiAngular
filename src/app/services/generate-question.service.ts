import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QuestionMissionDTO} from '../models/questionMissionDTO';
import { ResponseModel } from '../models/responseModel';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Question} from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class GenerateQuestionService {
apiUrl="https://localhost:44356/api/QuestionGenerate/Generate";
  constructor(private httpClient:HttpClient) { }

  generateQuestion(questionMission:QuestionMissionDTO[]):Observable<ListResponseModel<Question>>{
    return this.httpClient.post<ListResponseModel<Question>>(this.apiUrl,questionMission);
  }
}
