import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        { provide: HttpClient, useValue: spy }
      ],
    });

    service = TestBed.inject(AuthService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isAuthenticatedSubject to true on successful login', fakeAsync(() => {
    const loginResponse = { sessionToken: 'someToken' };
    httpSpy.post.and.returnValue(of(loginResponse));

    service.login('testUser', 'testPassword').then(() => {
      tick();
      expect(getAuthServicePrivateProperty(service, 'isAuthenticatedSubject').value).toBe(true);
    }).catch(fail); 
  }));

  it('should set isAuthenticatedSubject to false on logout', fakeAsync(() => {
    const logoutResponse = {};
    httpSpy.post.and.returnValue(of(logoutResponse));

    service.logout().then(() => {
      tick();
      expect(getAuthServicePrivateProperty(service, 'isAuthenticatedSubject').value).toBe(false);
    }).catch(fail); 
  }));


  // Helper function to access private properties
  function getAuthServicePrivateProperty(instance: AuthService, propertyName: string) {
    return (instance as any)[propertyName];
  }
});
