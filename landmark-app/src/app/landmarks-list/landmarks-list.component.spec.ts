import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { LandmarksListComponent } from './landmarks-list.component';

describe('LandmarksListComponent', () => {
  let component: LandmarksListComponent;
  let fixture: ComponentFixture<LandmarksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandmarksListComponent],
      imports: [HttpClientModule, FormsModule],  
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandmarksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
