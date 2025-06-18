import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {ToastrService} from 'ngx-toastr';
import {ChildService} from '../../services/child.service';
import {Child} from '../../models/child';
import {LowerCasePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MissionService} from '../../services/mission.service';
import {MissionType} from '../../models/missionType';
import {PhotoVeriftMissionService} from '../../services/photo-verift-mission.service';
import {QuestionMissionService} from '../../services/question-mission.service';

declare var bootstrap: any;

@Component({
  selector: 'app-child-list',
  imports: [
    LowerCasePipe
  ],
  templateUrl: './child-list.component.html',
  styleUrl: './child-list.component.css'
})
export class ChildListComponent implements OnInit{
  @ViewChild('childModal') childModal!: ElementRef;
  @ViewChild('taskTypeModal') taskTypeModal!: ElementRef;
  parentId:number;
  childList:any[];
  selectedChild:Child|null;
  selectedChildId: number | null = null;
  private modalInstance: any;
  taskList:MissionType[];
  missionCounts = new Map<number, number>();

  constructor(private jwtService:JwtService,private toastr:ToastrService,private childService:ChildService,
              private router:Router, private missionService:MissionService,
              private questionMissionService:QuestionMissionService, private photoMissionService:PhotoVeriftMissionService) {
  }
    ngOnInit(): void {
        this.parentId=this.jwtService.getParentId(localStorage.getItem('token'));
        this.getChildList(this.parentId)
      this.missionService.getMissionType().subscribe(res=>{this.taskList=res.data})

      const active = localStorage.getItem('activeChild');
      if (active) {
        const parsed = JSON.parse(active);
        this.selectedChildId = parsed.id;
      }

    }

  selectChild(child: Child) {
    localStorage.setItem('activeChild', JSON.stringify(child));
    this.toastr.success(`${child.firstName} cihazla eşleştirildi`);
    this.selectedChildId = child.id;
  }
  isActiveChild(child: Child): boolean {
    const active = localStorage.getItem('activeChild');
    if (!active) return false;
    const parsed = JSON.parse(active);
    return parsed.id === child.id;
  }

    getChildList(id:number){
      this.childService.getChildByParentId(id).subscribe(data =>{
          this.childList=data.data
        this.loadMissionGetAll();
      });
    }


  openModal(child: Child, event: MouseEvent) {
    event.stopPropagation();
    this.selectedChild = child;

    const modalEl = this.childModal?.nativeElement;
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    } else {
      console.error('Modal elementi bulunamadı!');
    }
  }

  goToDetail(child: Child) {
    // Modalı gizle (önlem olarak)
    bootstrap.Modal.getInstance(this.childModal.nativeElement)?.hide();

    // Modal'a ait stilleri temizle
    document.body.classList.remove('modal-open');
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(b => b.remove());

    // Detay sayfasına yönlendir
    this.router.navigate(['/child', child.id]);
  }

  openTaskTypeModal() {
    bootstrap.Modal.getInstance(this.childModal.nativeElement)?.hide();
    const modal = new bootstrap.Modal(this.taskTypeModal.nativeElement);
    modal.show();
  }

  goToTaskPage(tip: any) {
    const childId = this.selectedChild.id;
    bootstrap.Modal.getInstance(this.taskTypeModal.nativeElement)?.hide();
    if (tip==1){
      this.router.navigate(['/questionmission', childId]);
    }
    else if (tip==2){
      this.router.navigate(['/photomission', childId]);
    }
  }

  loadMissionGetAll(){
    this.childList.forEach(child => {
      let total = 0;

      //Soru Görevlerini Getir
      this.questionMissionService.getMissionByChildId(child.id).subscribe(qRes =>{
        const activeQuestion = qRes.data.filter(q => q.isApproved);
        total += activeQuestion.length;

        //fotoğraflı Görevleri Getir
        this.photoMissionService.getMissionByChildId(child.id).subscribe(pRes => {
          const activePhoto = pRes.data.filter(p => !p.isApproved);
          total+=activePhoto.length;

          this.missionCounts.set(child.id, total);
        })

      })
    })
  }

}
