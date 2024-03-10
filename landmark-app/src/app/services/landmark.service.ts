import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Landmark, LandmarkList, UpdateResponse } from '../models/landmark.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private apiUrl: string = environment.apiUrl;
  private applicationId: string = environment.appId;

  constructor(private http: HttpClient) {}

  /**
   * Returns HttpHeaders with authentication headers if includeSessionToken is true.
   * @param includeSessionToken Flag indicating whether to include the session token in the headers.
   * @returns HttpHeaders with or without session token.
   */
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

  /**
   * Retrieves a cookie by name.
   * @param name The name of the cookie to retrieve.
   * @returns The value of the cookie or null if not found.
   */
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

  /**
   * Retrieves a list of landmarks optionally filtered by a search term.
   * @param searchTerm Optional search term to filter landmarks by title or short_info.
   * @returns Observable<LandmarkList> containing a list of landmarks.
   */
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

  /**
   * Retrieves a single landmark by its objectId.
   * @param id The objectId of the landmark to retrieve.
   * @returns Observable<Landmark> containing the specified landmark.
   */
  getLandmarkById(id: string): Observable<Landmark> {
    const apiUrl = `${this.apiUrl}/classes/Landmark/${id}`;
    return this.http.get<Landmark>(apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Updates the title of a landmark.
   * @param objectId The objectId of the landmark to update.
   * @param newTitle The new title to set for the landmark.
   * @returns Observable<UpdateResponse> indicating the success of the update.
   */
  updateLandmarkTitle(objectId: string, newTitle: string): Observable<UpdateResponse> {
    const updateData = { title: newTitle };
    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;
    return this.http.put<UpdateResponse>(updateUrl, updateData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Updates the short_info of a landmark.
   * @param objectId The objectId of the landmark to update.
   * @param newShortInfo The new short_info to set for the landmark.
   * @returns Observable<UpdateResponse> indicating the success of the update.
   */
  updateLandmarkShortInfo(objectId: string, newShortInfo: string): Observable<UpdateResponse> {
    const updateData = { short_info: newShortInfo };
    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;
    return this.http.put<UpdateResponse>(updateUrl, updateData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Updates the description of a landmark.
   * @param objectId The objectId of the landmark to update.
   * @param newDescription The new description to set for the landmark.
   * @returns Observable<UpdateResponse> indicating the success of the update.
   */
  updateLandmarkDescription(objectId: string, newDescription: string): Observable<UpdateResponse> {
    const updateData = { description: newDescription };
    const updateUrl = `${this.apiUrl}/classes/Landmark/${objectId}`;
    return this.http.put<UpdateResponse>(updateUrl, updateData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Handles HTTP request errors and logs them to the console.
   * @param error The error object received from the HTTP request.
   * @returns Observable<never> representing the error.
   */
  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return new Observable<never>();
  }
}
