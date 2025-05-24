import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionMissionService} from '../../services/question-mission.service';
import {PhotoVeriftMissionService} from '../../services/photo-verift-mission.service';
import {JwtService} from '../../services/jwt.service';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';

declare var bootstrap: any;
@Component({
  selector: 'app-child-home',
  imports: [
    FormsModule
  ],
  templateUrl: './child-home.component.html',
  styleUrl: './child-home.component.css'
})
export class ChildHomeComponent implements OnInit{
  @ViewChild('logoutModal') logoutModal!: ElementRef;
  child:any;
  missions:any[];
  exitPassword:"";

  modalInstance:any;

  constructor(private router:Router, private questionMissionService : QuestionMissionService,
              private photoMissionService: PhotoVeriftMissionService, private jwtService: JwtService,
              private toastr: ToastrService, private authService: AuthService,) {
  }
    ngOnInit(): void {
        const stored = localStorage.getItem('activeChild');
        if (!stored) {
          this.router.navigate(['/']);
        }

        this.child= JSON.parse(stored);
        this.loadMissions();
        console.log(this.jwtService.getParentEmail(localStorage.getItem('token')));
    }

  openLogoutModal() {
    const modal = new bootstrap.Modal(this.logoutModal.nativeElement);
    modal.show();
  }


    confirmLogout(): void {
    const token = localStorage.getItem('token');
    const email = this.jwtService.getParentEmail(token);
    console.log(email);

    if (!email || !this.exitPassword) {
      this.toastr.error("Eksik Bilgi")
      return;
    }

    this.authService.loginParent({email, password: this.exitPassword}).subscribe({
      next: (res) => {
        if (res.success==true){
          localStorage.removeItem('activeChild');
          this.toastr.success("Çocuk Oturumundan Çıkıldı");
          this.router.navigate(['/']);
        }else {
          this.toastr.error("Şifre Yanlış")
        }
      },
      error: () => {
        this.toastr.error("Giriş Başarısız")
      }
    })
    }

    loadMissions(): void {
    const childId= this.child.id;

    this.questionMissionService.getMissionDetailByChildId(childId).subscribe(questionRes=>{
      const questionMissions=questionRes.data.map(m=>({
        id: m.id,
        title:m.schoolLessonName+" Soru Çözümü",
        description:m.description,
        sessionDuration:m.allowedTime,
        type:"question",
        raw:m
      }));

      this.photoMissionService.getMissionDetailByChildId(childId).subscribe(photoRes=>{
        const photoMissions=photoRes.data.map(m=>({
          id: m.id,
          title:m.missionTitle,
          description: m.missionDescription,
          sessionDuration:m.sessionDuration,
          type:"photo",
          raw:m

        }));
          this.missions=[...photoMissions,...questionMissions];
      })
    })
    }

    goToMission(mission:any){
    if (mission.type==="question"){
      this.router.navigate(['/questionmission'],mission.id);
    }else if(mission.type==="photo"){
      this.router.navigate(['/photomission'],mission.id);
    }

    }

}
