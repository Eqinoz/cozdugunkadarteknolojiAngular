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
  message: string;

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
    if (this.selectedOption !== null) { // Eğer zaten bir cevap seçilmişse (hızlı tıklamaları önlemek için)
      return;
    }
    this.selectedOption = option;
    const currentQuestion = this.questions[this.currentQuestionIndex];

    // --- DEBUG LOGLARI ---
    console.log("--- Cevap Kontrolü ---");
    console.log("Mevcut Soru Objesi:", JSON.stringify(currentQuestion));
    console.log("Kullanıcının Seçtiği Seçenek (option):", `"${option}"`);
    console.log("Sorunun Doğru Cevabı (currentQuestion.correctAnswer):", `"${currentQuestion.correctAnswer}"`);
    // --- DEBUG LOGLARI BİTİŞ ---

    const correctAnswerText = currentQuestion.options[
      this.letterToIndex(currentQuestion.correctAnswer)
      ];

    if (option === correctAnswerText) {
      this.score++;
      console.log("DOĞRU CEVAP! Yeni Skor:", this.score);
    } else {
      console.log("YANLIŞ CEVAP veya Soru/Cevap Tanımsız. Skor Değişmedi:", this.score);
    }

    // Bir sonraki soruya geçmeden önce kısa bir bekleme (görsel geri bildirim için)
    setTimeout(() => {
      this.selectedOption = null; // Seçimi temizle
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.currentQuestionIndex++;// testin bittiğini anlaman için
        const basariOrani= this.missionDetails.numberOfQuestion*(this.missionDetails.successRate/100)
        if (this.score>=basariOrani){
           this.message="Tebrikler istenilen Başarı Oranı İle Çözdünüz."
          this.questionMissionService.changeMissionStatus(this.missionId).subscribe({
            next: (result) => {this.toastr.success("Görev Başarıyla Tamamlandı")}
          })
        }else{
           this.message="Üzgünüm İstenilen Başarı Oranından Daha Düşük, Tekrar Deniyebilirsiniz ."
        }
      }
    }, 1000);
  }
  trackFn(index: number, item: any): any {
    return item;
  }
  letterToIndex(letter: string): number {
    switch (letter.toUpperCase()) {
      case 'A': return 0;
      case 'B': return 1;
      case 'C': return 2;
      case 'D': return 3;
      default: return -1;
    }
  }
  getCorrectAnswerText(): string {
    const current = this.questions[this.currentQuestionIndex];
    return current.options[this.letterToIndex(current.correctAnswer)];
  }


}
