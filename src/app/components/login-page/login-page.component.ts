import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router,} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService,
              private toastr: ToastrService, private router: Router) {
  }
    ngOnInit(): void {
        this.createLoginForm()
    }

    createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
    }

    login(){
    console.log("if'den önce")
      if (this.loginForm.valid){
        let loginModel = Object.assign({}, this.loginForm.value);
        console.log(loginModel);
        console.log("ifin içi");

        this.authService.loginParent(loginModel).subscribe({
          next: response => {
            this.toastr.success('Login successfully!');
            console.log(response.data);
            console.log("Successfully logged in");
            localStorage.setItem("token",response.data.token);
            let url =this.authService.rediractUrl
            if (url){
              this.router.navigate([url])
            }
            else{
              this.router.navigate([''])
            }
          },
          error: error => {
            this.toastr.error("Başarısız")
          }
        })
      }
    }
    buttonTry(){
    console.log("butona basıldı")
    }

}
