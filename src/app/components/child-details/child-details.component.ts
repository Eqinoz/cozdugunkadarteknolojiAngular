import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildService} from '../../services/child.service';
import {Child} from '../../models/child';
import {PhotoVeriftMissionService} from '../../services/photo-verift-mission.service';
import {QuestionMissionService} from '../../services/question-mission.service';
import {PhotoVerifyMission} from '../../models/photoVerifyMission';

@Component({
  selector: 'app-child-details',
  imports: [],
  templateUrl: './child-details.component.html',
  styleUrl: './child-details.component.css'
})
export class ChildDetailsComponent implements OnInit {
  id: number;
  child: Child;
  photoMission:any[];
  questionMission:any[];

  constructor(private route:ActivatedRoute,private childService:ChildService, private photoMissionService:PhotoVeriftMissionService,
  private questionMissionService:QuestionMissionService) {
    route.params.subscribe(params => {
      this.id = +params['id'];
    })
  }
    ngOnInit(): void {
        this.getChildDetails(this.id)
      this.getPhotoMission(this.id)
      this.getQuestionMission(this.id)

    }

    getChildDetails(id:number){
        this.childService.getChildById(id).subscribe(response =>{
          this.child=response.data
          console.log(this.child)
        })
    }
    getPhotoMission(id:number){
      this.photoMissionService.getMissionByChildId(id).subscribe(response =>{
        this.photoMission=response.data;
      })
    }
    getQuestionMission(id:number){
    this.questionMissionService.getMissionByChildId(id).subscribe(response =>{
      this.questionMission=response.data;
    })
    }

}
