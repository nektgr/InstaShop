import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPopupComponent } from './photo-popup.component';

describe('PhotoPopupComponent', () => {
  let component: PhotoPopupComponent;
  let fixture: ComponentFixture<PhotoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
