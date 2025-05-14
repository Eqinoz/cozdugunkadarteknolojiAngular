import {Component, OnInit} from '@angular/core';
import {ChildService} from '../../services/child.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Child} from '../../models/child';
import {LessonService} from '../../services/lesson.service';
import {Lesson} from '../../models/lesson';

@Component({
  selector: 'app-question-mission-page',
  imports: [
    FormsModule
  ],
  templateUrl: './question-mission-page.component.html',
  styleUrl: './question-mission-page.component.css'
})
export class QuestionMissionPageComponent implements OnInit {
  id: number;
  child: Child;
  lessons: Lesson[];
  successRate=0;
  constructor(private childService:ChildService, private toastr: ToastrService,
              private formBuilder:FormBuilder,private route:ActivatedRoute,
              private lessonService:LessonService) {
  }


    ngOnInit(): void {
        this.id = Number(this.route.snapshot.params['id']);
        console.log("İd:",this.id);
        this.getChild(this.id)

    }


    getChild(id:number){
    this.childService.getChildById(id).subscribe(data=>{
      this.child=data.data;
      this.toastr.success("Başarılı");
      this.getLesson(this.child.educationStatu)

    })

    }

    getLesson(lessonName:string){
      this.lessonService.getLessonBySchoolName(lessonName).subscribe(data=>{
        this.lessons=data.data;
      })
    }

}
