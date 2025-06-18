import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);
  const router = inject(Router);

  const targetUrl = state.url;
  if (targetUrl==="/register"){
    return true;
  }

  if (authService.isAuthenticated()){
    return true;
  }
  else {
    authService.rediractUrl = targetUrl;
    router.navigate(['login']);
    toastrService.info("Uygulamaya Giriş Yapmalısınız")
    return false;
  }

};
