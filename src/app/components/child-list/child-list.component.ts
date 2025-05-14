import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {ToastrService} from 'ngx-toastr';
import {ChildService} from '../../services/child.service';
import {Child} from '../../models/child';
import {LowerCasePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MissionService} from '../../services/mission.service';
import {MissionType} from '../../models/missionType';

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
  private modalInstance: any;
  taskList:MissionType[];

  constructor(private jwtService:JwtService,private toastr:ToastrService,private childService:ChildService,
              private router:Router, private missionService:MissionService) {
  }
    ngOnInit(): void {
        this.parentId=this.jwtService.getParentId(localStorage.getItem('token'));
        this.getChildList(this.parentId)
      this.missionService.getMissionType().subscribe(res=>{this.taskList=res.data})

    }

    getChildList(id:number){
      this.childService.getChildByParentId(id).subscribe(data =>
      this.childList=data.data);

    }
    getChildId(id:number){
        this.router.navigate(['/child/'+id]);
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

}
