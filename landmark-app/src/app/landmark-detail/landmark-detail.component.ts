// landmark-detail.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Landmark } from '../models/landmark.model';
import { LandmarkService } from '../services/landmark.service';
import { AuthService } from '../services/auth.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-landmark-detail',
  templateUrl: './landmark-detail.component.html',
  styleUrls: ['./landmark-detail.component.css'],
})
export class LandmarkDetailComponent implements OnInit, OnDestroy {
  landmark: Landmark | undefined;
  isAuthenticated: boolean = false;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private landmarkService: LandmarkService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize component and subscribe to authentication changes
    this.fetchLandmark();
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from observables to prevent memory leaks
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private fetchLandmark() {
    // Fetch landmark data based on the route parameter
    const landmarkId = this.route.snapshot.paramMap.get('id');
    if (landmarkId) {
      this.landmarkService.getLandmarkById(landmarkId).subscribe(
        (result) => {
          this.landmark = result;
        },
        (error) => {
          console.error('Error fetching landmark', error);
        }
      );
    }
  }

  // Event handler for title change
  onTitleChange(newTitle: string, landmark: Landmark | undefined) {
    if (landmark) {
      // Make a PUT request to update the title on the server
      this.landmarkService.updateLandmarkTitle(landmark.objectId!, newTitle).subscribe(
        (response) => {
         
        },
        (error) => {
          console.error('Error updating title:', error);
        }
      );
    }
  }

  // Event handler for short info change
  onShortInfoChange(newShortInfo: string, landmark: Landmark | undefined) {
    if (landmark) {
      // Make a PUT request to update the short info on the server
      this.landmarkService.updateLandmarkShortInfo(landmark.objectId!, newShortInfo).subscribe(
        (response) => {
         
        },
        (error) => {
          console.error('Error updating short info:', error);
        }
      );
    }
  }

  // Event handler for description change
  onDescriptionChange(newDescription: string, landmark: Landmark | undefined) {
    if (landmark) {
      // Make a PUT request to update the Description on the server
      this.landmarkService.updateLandmarkDescription(landmark.objectId!, newDescription).subscribe(
        (response) => {
         
        },
        (error) => {
          console.error('Error updating Description:', error);
        }
      );
    }
  }
}
