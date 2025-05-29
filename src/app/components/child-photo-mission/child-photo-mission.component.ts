import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PhotoVeriftMissionService} from '../../services/photo-verift-mission.service';
import {PhotoVerifyMissionDTO} from '../../models/photoVerifyMissionDTO';

@Component({
  selector: 'app-child-photo-mission',
  imports: [
    FormsModule
  ],
  templateUrl: './child-photo-mission.component.html',
  styleUrl: './child-photo-mission.component.css'
})
export class ChildPhotoMissionComponent implements OnInit {
  @ViewChild('video') videoRef!: ElementRef;

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  cameraOpen = false;
  description = '';
  missionId: number;

  mission: any;

  constructor(private location: Location, private route: ActivatedRoute,
  private photoMissionService:PhotoVeriftMissionService, private toastr: ToastrService,) {}

  ngOnInit() {

  this.route.params.subscribe(params => {
    this.missionId = +params['id'];
    this.getMissionDetails(this.missionId);
  })
  }

  getMissionDetails(id:number) {
    this.photoMissionService.getMissionById(id).subscribe({
      next: response => {this.mission = response.data; this.toastr.success("Detaylar Eklendi");console.log(this.mission)},
      error:err => {this.toastr.error(err.message)}
    });
  }

  goBack() {
    this.location.back();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  openCamera() {
    this.cameraOpen = true;
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.videoRef.nativeElement.srcObject = stream;
    }).catch(err => {
      alert("Kamera açılamadı: " + err);
    });
  }

  closeCamera() {
    this.cameraOpen = false;
    const video = this.videoRef.nativeElement as HTMLVideoElement;
    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }

  capturePhoto() {
    const video = this.videoRef.nativeElement as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    this.previewUrl = dataUrl;

    canvas.toBlob(blob => {
      if (blob) {
        this.selectedFile = new File([blob], "photo.png", { type: 'image/png' });
      }
    }, 'image/png');
  }

  submit() {
    if (!this.selectedFile) {
      alert("Lütfen bir fotoğraf seçin veya çekin.");
      return;
    }

    const formData = new FormData();
    formData.append('photo', this.selectedFile);
    formData.append('description', this.description);

    // TODO: API'ye gönder
    console.log("FormData:", formData);
    alert("Fotoğraf gönderildi!");
  }
}
