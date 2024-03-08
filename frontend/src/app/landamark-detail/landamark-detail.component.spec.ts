import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandamarkDetailComponent } from './landamark-detail.component';

describe('LandamarkDetailComponent', () => {
  let component: LandamarkDetailComponent;
  let fixture: ComponentFixture<LandamarkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandamarkDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandamarkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
