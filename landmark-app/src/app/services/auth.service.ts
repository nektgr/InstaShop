import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if there is a user session on app startup
    const currentUser = this.getCookie('sessionToken');
    if (currentUser) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  private getHeaders(includeSessionToken: boolean = true): HttpHeaders {
    const headersConfig: { [key: string]: string } = {
      'X-Parse-Application-Id': environment.appId,
      'Content-Type': 'application/json'
    };

    if (includeSessionToken) {
      const sessionToken = this.getCookie('sessionToken');
      if (sessionToken) {
        headersConfig['X-Parse-Session-Token'] = sessionToken;
      }
    }

    return new HttpHeaders(headersConfig);
  }

  private setCookie(name: string, value: string, expirationDays: number) {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  private getCookie(name: string): string | null {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }

  login(username: string, password: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': environment.appId
    });

    const body = {
      username,
      password
    };

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap(response => {
        if (response.sessionToken) {
          this.setCookie('sessionToken', response.sessionToken, 1); // 1 day expiration, adjust as needed
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    ).toPromise();
  }

  logout(): Promise<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, null, { headers: this.getHeaders() }).toPromise()
      .then(() => {
        console.log('User logged out successfully');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      })
      .finally(() => {
        this.deleteCookie('sessionToken');
        this.isAuthenticatedSubject.next(false);
      });
  }

  private deleteCookie(name: string) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
  }


}
