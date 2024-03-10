import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LandmarkService } from './landmark.service';
import { environment } from '../../enviroments/enviroment';
import { Landmark } from '../models/landmark.model';

describe('LandmarkService', () => {
  let service: LandmarkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LandmarkService]
    });

    service = TestBed.inject(LandmarkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve landmarks', () => {
    const searchTerm = 'test';
    const mockLandmarks: Landmark[] = [
      {
        objectId: '1',
        title: 'Test Landmark 1',
        photo_thumb: 'thumbnail_url_1',
        short_info: 'Short info for Test Landmark 1',
        description: 'Description for Test Landmark 1',
        official_site: 'https://testlandmark1.com',
        location: [10.123, 20.456],
        order: 1,
        photo: 'full_photo_url_1',
      },
    ];

    service.getLandmarks(searchTerm).subscribe((landmarks) => {
      expect(landmarks).toEqual(mockLandmarks);
    });

    const apiUrl = `${environment.apiUrl}/classes/Landmark/`;
    const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'GET');

    expect(req.request.params.get('where')).toContain(searchTerm);

    req.flush(mockLandmarks);
  });

  it('should retrieve a landmark by ID', () => {
    const mockLandmark: Landmark = {
      objectId: '1',
      title: 'Test Landmark 1',
      photo_thumb: 'thumbnail_url_1',
      short_info: 'Short info for Test Landmark 1',
      description: 'Description for Test Landmark 1',
      official_site: 'https://testlandmark1.com',
      location: [10.123, 20.456],
      order: 1,
      photo: 'full_photo_url_1',
    };
    const objectId = '1';

    service.getLandmarkById(objectId).subscribe((landmark) => {
      expect(landmark).toEqual(mockLandmark);
    });

    const apiUrl = `${environment.apiUrl}/classes/Landmark/${objectId}`;
    const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'GET');

    req.flush(mockLandmark);
  });

  
});
