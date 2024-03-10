import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Landmark, LandmarkList } from '../models/landmark.model';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private apiUrl:string= environment.apiUrl;
  private applicationId:string = environment.appId;
  constructor(private http: HttpClient) {}
  
  private getHeaders(includeSessionToken: boolean = true): HttpHeaders {
    const headersConfig: {
      [key: string]: string;
    } = {
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

  getLandmarks(searchTerm?: string): Observable<Landmark[]> {
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
    return this.http.get<Landmark[]>(apiUrl, { headers: this.getHeaders(), params });
  }

  getLandmarkById(id: string): Observable<Landmark> {
    const apiUrl = `${this.apiUrl}/classes/Landmark/${id}`;
    return this.http.get<Landmark>(apiUrl, { headers: this.getHeaders() });
  }

  
  updateLandmarkTitle(objectId: string, newTitle: string): Observable<any> {
    const updateData = {
      title: newTitle
    };

    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;

    return this.http.put<any>(updateUrl, updateData, { headers: this.getHeaders() });
  }

  updateLandmarkShortInfo(objectId: string, newShortInfo: string): Observable<any> {
    const updateData = {
      short_info: newShortInfo
    };

    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;

    return this.http.put<any>(updateUrl, updateData, { headers: this.getHeaders() });
  }

  updateLandmarkDescription(objectId: string, newDescription: string): Observable<any> {
    const updateData = {
      description: newDescription
    };

    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;

    return this.http.put<any>(updateUrl, updateData, { headers: this.getHeaders() });
  }
}
