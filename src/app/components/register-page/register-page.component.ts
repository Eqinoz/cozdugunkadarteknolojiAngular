import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private authService: AuthService
  ) {
  }
    ngOnInit(): void {
        this.createRegisterForm()
    }

    createRegisterForm(){
      this.registerForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        titleName: ['Parent', [Validators.required]],
      })
    }
    register(){
    console.log(this.registerForm.value)
      console.log("if öncesi")
    if (this.registerForm.valid) {
      console.log("ifin içi");
      let registerModel= Object.assign({},this.registerForm.value);
      this.authService.registerParent(registerModel).subscribe({
        complete:()=>{
          this.toastr.success('Register successfully!');
        },
        error:err=>{
          this.toastr.error(err.errors,'Register failed.');

        }
      })
    }
    }

}
