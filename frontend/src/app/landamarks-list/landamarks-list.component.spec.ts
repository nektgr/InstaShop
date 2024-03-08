import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandamarksListComponent } from './landamarks-list.component';

describe('LandamarksListComponent', () => {
  let component: LandamarksListComponent;
  let fixture: ComponentFixture<LandamarksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandamarksListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandamarksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
