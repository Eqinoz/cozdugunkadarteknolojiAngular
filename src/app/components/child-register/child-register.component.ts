import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChildService} from '../../services/child.service';
import {ToastrService} from 'ngx-toastr';
import {JwtService} from '../../services/jwt.service';
import {SchoolService} from '../../services/school.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-child-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './child-register.component.html',
  styleUrl: './child-register.component.css'
})
export class ChildRegisterComponent implements  OnInit{
  childRegisterForm:FormGroup;
  parentId:number;
  schoolName:any[];

  constructor(private formBuilder: FormBuilder,private childRegister:ChildService,
              private toastr:ToastrService,private jwtService: JwtService,
              private schoolService: SchoolService, private location:Location) {
  }
    ngOnInit(): void {
      this.getParentId();
        this.createAddChildForm();

      this.getSchoolName();
    }

    createAddChildForm(){
    this.childRegisterForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      gender:['', Validators.required],
      parentId: this.parentId,
      educationStatu:['', Validators.required],
    })
    }

    addChild(){
    console.log(this.childRegisterForm.value);
    if (this.childRegisterForm.valid) {
      let childRegisterModel = Object.assign({}, this.childRegisterForm.value);
      this.childRegister.childRegister(childRegisterModel).subscribe({
       next:data => {this.toastr.success("Çocuk Eklendi","Başarılı");this.childRegisterForm.reset();},
        error: error => console.log(error),
      });
    }
    }

    getParentId(){
      this.parentId=this.jwtService.getParentId(localStorage.getItem("token"));
      console.log(this.parentId);
    }

    getSchoolName(){
    this.schoolService.getSchool().subscribe({
      next: data => this.schoolName=data.data,
      error: error => console.log(error)
    })
    }

    goBack():void{
      this.location.back();
    }

}
