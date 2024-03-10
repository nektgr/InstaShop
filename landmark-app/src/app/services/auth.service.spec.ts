// auth.service.spec.ts

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // Create a spy for the HttpClient service
    const spy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        // Provide the HttpClient spy as a dependency
        { provide: HttpClient, useValue: spy }
      ],
    });

    // Inject the AuthService and HttpClient spy
    service = TestBed.inject(AuthService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  // Test: AuthService should be created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test: AuthService should set isAuthenticatedSubject to true on successful login
  it('should set isAuthenticatedSubject to true on successful login', fakeAsync(() => {
    // Mock the login response
    const loginResponse = { sessionToken: 'someToken' };
    httpSpy.post.and.returnValue(of(loginResponse));

    // Call the login method and wait for the asynchronous operation to complete
    service.login('testUser', 'testPassword').then(() => {
      tick(); // Simulate the passage of time
      // Assert that isAuthenticatedSubject is set to true
      expect(getAuthServicePrivateProperty(service, 'isAuthenticatedSubject').value).toBe(true);
    }).catch(fail); 
  }));

  // Test: AuthService should set isAuthenticatedSubject to false on logout
  it('should set isAuthenticatedSubject to false on logout', fakeAsync(() => {
    // Mock the logout response
    const logoutResponse = {};
    httpSpy.post.and.returnValue(of(logoutResponse));

    // Call the logout method and wait for the asynchronous operation to complete
    service.logout().then(() => {
      tick(); // Simulate the passage of time
      // Assert that isAuthenticatedSubject is set to false
      expect(getAuthServicePrivateProperty(service, 'isAuthenticatedSubject').value).toBe(false);
    }).catch(fail); 
  }));

  // Helper function to access private properties
  function getAuthServicePrivateProperty(instance: AuthService, propertyName: string) {
    return (instance as any)[propertyName];
  }
});
