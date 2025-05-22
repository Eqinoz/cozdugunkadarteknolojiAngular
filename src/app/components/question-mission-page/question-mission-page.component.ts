import {Component, OnInit} from '@angular/core';
import {ChildService} from '../../services/child.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Child} from '../../models/child';
import {LessonService} from '../../services/lesson.service';
import {Lesson} from '../../models/lesson';
import {JwtService} from '../../services/jwt.service';
import {QuestionMissionService} from '../../services/question-mission.service';

@Component({
  selector: 'app-question-mission-page',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './question-mission-page.component.html',
  styleUrl: './question-mission-page.component.css'
})
export class QuestionMissionPageComponent implements OnInit {
  id: number;
  parentId: number;
  child: Child;
  lessons: Lesson[];
  missionForm: FormGroup;
  successRate=0;
  constructor(private childService:ChildService, private toastr: ToastrService,
              private formBuilder:FormBuilder,private route:ActivatedRoute,
              private lessonService:LessonService,private jwtService:JwtService,
              private questionService:QuestionMissionService) {
  }


    ngOnInit(): void {
        this.id = Number(this.route.snapshot.params['id']);
        console.log("İd:",this.id);
        this.getChild(this.id)

      this.missionForm.get('successRate')?.valueChanges.subscribe(value => {
        this.successRate = value;
      });

    }

    createQuestionMissionForm(){
      this.missionForm = this.formBuilder.group({
        childId: [this.id,Validators.required],
        parentId: [this.parentId, Validators.required],
        schoolLessonId:["",Validators.required],
        numberOfQuestion:["",Validators.required],
        successRate:[this.successRate,Validators.required],
        allowedTime:["",Validators.required],
        description:["",Validators.required]

      })
    }


    getChild(id:number){
    this.childService.getChildById(id).subscribe(data=>{
      this.child=data.data;
      this.toastr.success("Başarılı");
      this.getLesson(this.child.educationStatu)
      this.getParentId();
    })

    }
  getParentId(){
    this.parentId=this.jwtService.getParentId(localStorage.getItem('token'));
    this.createQuestionMissionForm();
  }

    getLesson(lessonName:string){
      this.lessonService.getLessonBySchoolName(lessonName).subscribe(data=>{
        this.lessons=data.data;
      })
    }
sendMission(){
console.log(this.missionForm.value);
if (this.missionForm.valid) {
  console.log("if içi çalıştı")
  let mission = Object.assign({}, this.missionForm.value);
  this.questionService.addMisson(mission).subscribe({
    next: result => {this.toastr.success("Görev Eklendi")},
    error: err => console.log(err)
  })
}

}
}
