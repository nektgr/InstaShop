import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LandmarkService } from './landmark.service';
import { environment } from '../../enviroments/enviroment';
import { Landmark, LandmarkList } from '../models/landmark.model';

describe('LandmarkService', () => {
  let service: LandmarkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LandmarkService]
    });

    // Inject the service and the HTTP testing controller
    service = TestBed.inject(LandmarkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Ensure no outstanding requests are pending after each test
  afterEach(() => {
    httpMock.verify();
  });

  // Test: LandmarkService should be created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test: LandmarkService should retrieve landmarks
  it('should retrieve landmarks', () => {
    // Mock data
    const searchTerm = 'test';
    const mockLandmarksList: LandmarkList = {
      results: [
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
      ],
    };

    // Subscribe to the service method and expect a response
    service.getLandmarks(searchTerm).subscribe((landmarksList) => {
      expect(landmarksList).toEqual(mockLandmarksList);
    });

    // Expect a single HTTP request to the correct URL and method
    const apiUrl = `${environment.apiUrl}/classes/Landmark/`;
    const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'GET');

    // Expect the request to include the search term as a parameter
    expect(req.request.params.get('where')).toContain(searchTerm);

    // Respond to the request with mock data
    req.flush(mockLandmarksList);
  });

  // Test: LandmarkService should retrieve a landmark by ID
  it('should retrieve a landmark by ID', () => {
    // Mock data
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

    // Subscribe to the service method and expect a response
    service.getLandmarkById(objectId).subscribe((landmark) => {
      expect(landmark).toEqual(mockLandmark);
    });

    // Expect a single HTTP request to the correct URL and method
    const apiUrl = `${environment.apiUrl}/classes/Landmark/${objectId}`;
    const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'GET');

    // Respond to the request with mock data
    req.flush(mockLandmark);
  });
});
