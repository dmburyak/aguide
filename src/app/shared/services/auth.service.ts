import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(this.url, user)
      .pipe(
        tap(response => this.setToken(response))
      );
  }

  private setToken(response: any): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  get token(): string | null {
    const expDate = localStorage.getItem('fb-token-exp');
    const tokenExpDate = expDate ? new Date(expDate) : '';
    if (new Date() > tokenExpDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  iaAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken(null);
  }


}
