import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildService} from '../../services/child.service';
import {Child} from '../../models/child';
import {PhotoVeriftMissionService} from '../../services/photo-verift-mission.service';
import {QuestionMissionService} from '../../services/question-mission.service';
import {PhotoMissionCompletionService} from '../../services/photo-mission-completion.service';
import {PhotoMissionCompletionDTO} from '../../models/PhotoMissionCompletionDTO';
import {PhotoVerifyMissionWithSelected} from '../../models/PhotoVerifyMissionWithSelected';
import {PhotoVerifyMissionDTO} from '../../models/photoVerifyMissionDTO';
import {PhotoVerifyMission} from '../../models/photoVerifyMission';
import {ToastrService} from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-child-details',
  imports: [],
  templateUrl: './child-details.component.html',
  styleUrl: './child-details.component.css'
})
export class ChildDetailsComponent implements OnInit {
  id: number;
  child: Child;
  photoMission:PhotoVerifyMission[]=[];
  completionPhotoMission:any;
  questionMission:any;
  missionCounts :number;
  selectedMission:PhotoMissionCompletionDTO[] | null;

  approvedStatus:any;

  constructor(private route:ActivatedRoute,private childService:ChildService, private photoMissionService:PhotoVeriftMissionService,
  private questionMissionService:QuestionMissionService, private completionPhotoMissionService:PhotoMissionCompletionService,
              private toastrService: ToastrService,) {
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
          this.loadMissionGetAll()
        })
    }
    getPhotoMission(id:number){
      this.photoMissionService.getMissionByChildId(id).subscribe(response =>{
        this.photoMission=response.data

      })
    }

    getCompletionPhotoMission(id:number){
    this.completionPhotoMissionService.getCompletionMissionByMissionId(id).subscribe(response =>{
      this.completionPhotoMission=response
      console.log(response.data)
    })
    }

    getQuestionMission(id:number){
    this.questionMissionService.getMissionByChildId(id).subscribe(response =>{
      this.questionMission=response.data;
    })
    }
  loadMissionGetAll(){
      let total = 0;

      //Soru Görevlerini Getir
      this.questionMissionService.getMissionByChildId(this.id).subscribe(qRes =>{
        const activeQuestion = qRes.data.filter(q => !q.isApproved);
        total += activeQuestion.length;

        //fotoğraflı Görevleri Getir
        this.photoMissionService.getMissionByChildId(this.id).subscribe(pRes => {
          const activePhoto = pRes.data.filter(p => !p.isApproved);
          total+=activePhoto.length;

          this.missionCounts=total;
        })

      })

  }

  openModal(id:number) {
    this.getCompletionPhotoMission(id)

    const modalElement = document.getElementById('approvalModal');
    if (modalElement) {
      // Bootstrap 5 modal açma
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  approveMission() {
    if (!this.completionPhotoMission.data) return;

    const approvedId = this.completionPhotoMission.data.id;

    const found = this.photoMission.find(mission => mission.id === approvedId);
    if (found) {
      console.log("Onaylandı:", approvedId);
      this.photoMissionService.missionSuccessByMissionId(approvedId).subscribe(response =>{
        this.toastrService.success("Görev Onaylandı")
        window.location.reload();
      })
    }



    // Modal kapat
    bootstrap.Modal.getInstance(document.getElementById('approvalModal')!)?.hide();
  }

  rejectMission() {
    if (!this.completionPhotoMission.data) return;

    const approvedId = this.completionPhotoMission.data.id;

    const found = this.photoMission.find(mission => mission.id === approvedId);
    if (found) {
      console.log("Reddedildi:", found);
    }

    // Modal kapat
    bootstrap.Modal.getInstance(document.getElementById('approvalModal')!)?.hide();
  }

}
