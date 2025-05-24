import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {JwtService} from '../../services/jwt.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  menuOpen = false;
  parentName: string;
  isLoggedIn: boolean;

  constructor(private jwtService:JwtService, private router:Router) {
  }

    ngOnInit(): void {
      const token = localStorage.getItem('token');
      if (token && this.jwtService.isTokenValid()) {
        this.isLoggedIn = true;
      }
this.getUser();
    }
  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.parentName=null;
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  getUser(){
    this.parentName=this.jwtService.getParentName(localStorage.getItem("token"));

  }
}
