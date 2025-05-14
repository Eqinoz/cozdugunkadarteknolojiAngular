import {Component, OnInit} from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {ChildListComponent} from '../child-list/child-list.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ChildListComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  welcomeMessage: string;

  constructor(private jwt: JwtService) {
  }
    ngOnInit(): void {
        this.getUserName()
    }

    getUserName(){
     const parentName=this.jwt.getParentName(localStorage.getItem("token"));
     if (!parentName){
       this.welcomeMessage="Ana Sayfaya Hoşgeldiniz!"
     }
     else{
       this.welcomeMessage='Ana Sayfaya Hoşgeldiniz!, Sayın '+parentName +'!';
     }

    }

}
