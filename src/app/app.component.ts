import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cozdugunkadarteknoloji';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const activeChild = localStorage.getItem('activeChild');

    if (activeChild) {
      const currentUrl = this.router.url;
      // Eğer login gibi özel bir sayfadaysa yönlendirme yapma
      if (!currentUrl.includes('login') &&
        !currentUrl.includes("register") &&
      !currentUrl.includes("child-register")) {
        this.router.navigate(['/child-home']);
      }
    }
  }

}
