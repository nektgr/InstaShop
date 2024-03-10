// landmark-detail.component.spec.ts
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
      // Declarations of the component and related components
      declarations: [
        LandmarkDetailComponent,
        EditableContentComponent,
      ],
      // Providers setup for ActivatedRoute mock
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
      // Imports of required modules
      imports: [HttpClientModule],
    }).compileComponents();

    // Create component and fixture
    fixture = TestBed.createComponent(LandmarkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes in the component
  });

  // Test case: should create
  it('should create', () => {
    // Assert that the component is created successfully
    expect(component).toBeTruthy();
  });
});
