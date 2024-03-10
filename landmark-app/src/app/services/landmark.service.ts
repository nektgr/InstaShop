import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Landmark,LandmarkList,UpdateResponse } from '../models/landmark.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private apiUrl: string = environment.apiUrl;
  private applicationId: string = environment.appId;

  constructor(private http: HttpClient) {}

  private getHeaders(includeSessionToken: boolean = true): HttpHeaders {
    const headersConfig: Record<string, string> = {
      'X-Parse-Application-Id': this.applicationId,
      'Content-Type': 'application/json',
    };

    if (includeSessionToken) {
      const sessionToken = this.getCookie('sessionToken');
      if (sessionToken) {
        headersConfig['X-Parse-Session-Token'] = sessionToken;
      }
    }

    return new HttpHeaders(headersConfig);
  }

  private getCookie(name: string): string | null {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }

    return null;
  }

  getLandmarks(searchTerm?: string): Observable<LandmarkList> {
    let params = new HttpParams();

    if (searchTerm) {
      params = params.set('where', JSON.stringify({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { short_info: { $regex: searchTerm, $options: 'i' } }
        ]
      }));
    }

    const apiUrl = `${this.apiUrl}/classes/Landmark/`;
    return this.http.get<LandmarkList>(apiUrl, { headers: this.getHeaders(), params })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  getLandmarkById(id: string): Observable<Landmark> {
    const apiUrl = `${this.apiUrl}/classes/Landmark/${id}`;
    return this.http.get<Landmark>(apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  updateLandmarkTitle(objectId: string, newTitle: string): Observable<UpdateResponse> {
    const updateData = { title: newTitle };
    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;
    return this.http.put<UpdateResponse>(updateUrl, updateData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  updateLandmarkShortInfo(objectId: string, newShortInfo: string): Observable<UpdateResponse> {
    const updateData = { short_info: newShortInfo };
    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;
    return this.http.put<UpdateResponse>(updateUrl, updateData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  updateLandmarkDescription(objectId: string, newDescription: string): Observable<UpdateResponse> {
    const updateData = { description: newDescription };
    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;
    return this.http.put<UpdateResponse>(updateUrl, updateData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return new Observable<never>();
  }
}
