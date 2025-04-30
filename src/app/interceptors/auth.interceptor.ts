import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import {inject} from '@angular/core';
import {JwtService} from '../services/jwt.service';
import {ToastrService} from 'ngx-toastr';
import {throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(JwtService);
  const toastr = inject(ToastrService);
  let token=localStorage.getItem('token');

  if (token){
    const isValid = jwt.isTokenValid();
    if (!isValid){
      jwt.clearToken();
      toastr.info('Oturum Süreniz Doldu Lütfen Tekrar Giriş Yapınız.','Uyarı');
      return throwError(()=> new Error('Token Geçersiz'));
    }
  }
  let newReq:HttpRequest<any>;
  newReq = req.clone({
    headers:req.headers.set('Authorization', 'Bearer ' + token)
  })
  return next(newReq);
};
