import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';  
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoginModalComponent } from './login-modal.component';

// Mock NgbActiveModal
class MockNgbActiveModal {}

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginModalComponent],
      providers: [
        { provide: NgbActiveModal, useClass: MockNgbActiveModal }
      ],
      imports: [NgbModule, HttpClientModule, FormsModule],  
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
