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
  
  private getHeaders(): HttpHeaders {
    const headersConfig: {
      [key: string]: string;
    } = {
      'X-Parse-Application-Id': this.applicationId,
      'Content-Type': 'application/json'
    };
    return new HttpHeaders(headersConfig);
  }

  getLandmarks(): Observable<Landmark[]> {
    const endpoint = `${this.apiUrl}/classes/Landmark`;
    return this.http.get<Landmark[]>(endpoint, { headers: this.getHeaders() });
  }

  getLandmarkById(id: string): Observable<Landmark> {
    const apiUrl = `${this.apiUrl}/classes/Landmark/${id}`;
    return this.http.get<Landmark>(apiUrl, { headers: this.getHeaders() });
  }
}
