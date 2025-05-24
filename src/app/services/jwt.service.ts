import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const base64 = payload
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const paddedBase64 = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
      const decodedPayload = atob(paddedBase64);
      const utf8String = this.decodeUtf8(decodedPayload);
      return JSON.parse(utf8String);
    } catch (error) {
      console.error('Token Çözümlenemedi:', error);
      return null;
    }
  }

  getParentId(token:string): number{
    const decodeToken = this.decodeToken(token);
    if (decodeToken) {
      return decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    }
    return null;
  }

  getParentName(token:string):string{
    const decodeToken = this.decodeToken(token);
    if (decodeToken) {
      return decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    }
    return null;
  }
  getParentEmail(token:string):string{
    const decodeToken = this.decodeToken(token);
    if (decodeToken) {
      return decodeToken["email"]
    }
    return null;
  }

  private decodeUtf8(text: string): string {
    try {
      const utf8Decoder = new TextDecoder('utf-8');
      const byteArray = new Uint8Array(text.split('').map((char) => char.charCodeAt(0)));
      return utf8Decoder.decode(byteArray);
    } catch (error) {
      console.error('UTF-8 Çözümleme Hatası:', error);
      return text;
    }
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken =this.decodeToken(token);
    if (decodedToken && decodedToken.exp){
      return decodedToken.exp * 1000 > Date.now(); //token süresi geçti mi ?
    }
    return false;
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}
