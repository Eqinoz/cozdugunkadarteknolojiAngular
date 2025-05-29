import {Component, OnInit} from '@angular/core';
import { Question } from '../../models/question';
import {QuestionMissionService} from '../../services/question-mission.service';
import {GenerateQuestionService} from '../../services/generate-question.service';
import {ActivatedRoute} from '@angular/router';
import {QuestionMissionDTO} from '../../models/questionMissionDTO';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-child-question-mission',
  imports: [],
  templateUrl: './child-question-mission.component.html',
  styleUrl: './child-question-mission.component.css'
})
export class ChildQuestionMissionComponent implements OnInit {
  questions: Question[] = [];
  missionId: number =0;
  currentQuestionIndex = 0;
  selectedOption: string | null = null;
  missionDetails: any ;
  score = 0;
  started = false;
  loading = false;

  constructor(private questionMissionService: QuestionMissionService,private generateQuestion:GenerateQuestionService,
              private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.missionId = +params['id'];
      this.getMissionDetails(this.missionId);
    })
    // TODO: Replace this with real API call to OpenAI-backed endpoint


  }

  fetchQuestionsFromAI() {
    // Fake AI response simülasyonu
    // this.questions = [
    //   {
    //     questionText: "5 + 3 kaç eder?",
    //     options: ["6", "7", "8", "9"],
    //     correctAnswer: "8"
    //   },
    //   {
    //     questionText: "12 - 4 = ?",
    //     options: ["6", "7", "8", "9"],
    //     correctAnswer: "8"
    //   }
    // ];
    this.generateQuestion.generateQuestion(this.missionDetails).subscribe({
      next: (result) => {this.questions=result.data;},
      error: (error) => {this.toastr.error(error); }
    })
  }

  startMission() {
    this.loading = true;
    this.generateQuestion.generateQuestion(this.missionDetails).subscribe({
      next: (result) => {
        this.questions = result.data;
        this.started = true;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error("Soru oluşturulurken hata oluştu.");
        this.loading = false;
      }
    });
  }

  getMissionDetails(id: number) {
    this.questionMissionService.getMissionById(id).subscribe({
      next:result => {this.missionDetails=result.data; console.log(this.missionDetails); this.toastr.success("Görev Alındı."); this.loading=false;},
      error:err => {this.toastr.error(err);this.loading=false;}

    })
  }

  answer(option: string) {
    this.selectedOption = option;
    const current = this.questions[this.currentQuestionIndex];
    if (option === current.correctAnswer) {
      this.score++;
    }

    setTimeout(() => {
      this.selectedOption = null;
      this.currentQuestionIndex++;
    }, 500);
  }
  trackFn(index: number, item: any): any {
    return item;
  }
}
