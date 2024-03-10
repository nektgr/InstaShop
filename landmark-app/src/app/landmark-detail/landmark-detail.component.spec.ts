import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { LandmarkDetailComponent } from './landmark-detail.component';
import { EditableContentComponent } from '../editable-content/editable-content.component';

describe('LandmarkDetailComponent', () => {
  let component: LandmarkDetailComponent;
  let fixture: ComponentFixture<LandmarkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LandmarkDetailComponent,
        EditableContentComponent, 
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
      ],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LandmarkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
