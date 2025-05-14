import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChildService} from '../../services/child.service';
import {ActivatedRoute} from '@angular/router';
import {Child} from '../../models/child';
import {ToastrService} from 'ngx-toastr';
import {JwtService} from '../../services/jwt.service';
import {PhotoVeriftMissionService} from '../../services/photo-verift-mission.service';

@Component({
  selector: 'app-photo-verification-mission-page',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './photo-verification-mission-page.component.html',
  styleUrl: './photo-verification-mission-page.component.css'
})
export class PhotoVerificationMissionPageComponent implements OnInit{
  id:number;
  hasTimeLimit:boolean;
  parentId:number;
  childId:number;
  child:Child;
  missionForm:FormGroup;

  constructor(private childService:ChildService, private route:ActivatedRoute,private formBuilder:FormBuilder,
              private toastr:ToastrService,private jwtService: JwtService, private photoMission:PhotoVeriftMissionService) {
  }
    ngOnInit(): void {
      this.id = Number(this.route.snapshot.params['id']);
      console.log("İd:",this.id);
      this.getChild(this.id)



    }

    createPhotoMissionForm(){
    this.missionForm=this.formBuilder.group({
      childId:this.id,
      parentId:this.parentId,
      missionTitle:["",Validators.required],
      hasTimeLimit:[false,Validators.required],
      missionDuration:[null,Validators.required],
      sessionDuration:[1,Validators.required],
      missionDescription:["",Validators.required],
      IsApproved:true,
    })

    }

    getParentId(){
      this.parentId=this.jwtService.getParentId(localStorage.getItem('token'));
      this.createPhotoMissionForm()
    }

    getChild(id:number){
      this.childService.getChildById(id).subscribe(data=>{
        this.child=data.data;
      })
      this.getParentId()
    }


  submitForm() {
    console.log(this.missionForm.value);
    console.log("if dışı");
    if (this.missionForm.valid){
      console.log("if içi");
      let mission= Object.assign({}, this.missionForm.value);
      this.photoMission.addMission(mission).subscribe({
        next:data =>this.toastr.success("Görev Eklendi"),
        error: error => this.toastr.error(error),
      })
    }
  }

}
