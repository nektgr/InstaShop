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
    this.fetchLandmark();
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        console.log('User authenticated:', isAuthenticated);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private fetchLandmark() {
    console.log('Fetching landmark data');
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

  onTitleChange(newTitle: string, landmark: Landmark | undefined) {
    console.log('Title changed:', newTitle);
  
    if (landmark) {
      // Make a PUT request to update the title on the server
      this.landmarkService.updateLandmarkTitle(landmark.objectId!, newTitle).subscribe(
        (response) => {
          console.log('Title updated successfully:', response);
        },
        (error) => {
          console.error('Error updating title:', error);
        }
      );
    }
  }
  
  onShortInfoChange(newShortInfo: string, landmark: Landmark | undefined) {
    console.log('Short info changed:', newShortInfo);
  
    if (landmark) {
      // Make a PUT request to update the short info on the server
      this.landmarkService.updateLandmarkShortInfo(landmark.objectId!, newShortInfo).subscribe(
        (response) => {
          console.log('Short info updated successfully:', response);
        },
        (error) => {
          console.error('Error updating short info:', error);
        }
      );
    }
  }
  
  onDescriptionChange(newDescription: string, landmark: Landmark | undefined) {
    console.log('Description changed:', newDescription);
  
    if (landmark) {
      // Make a PUT request to update the Description on the server
      this.landmarkService.updateLandmarkDescription(landmark.objectId!, newDescription).subscribe(
        (response) => {
          console.log('Description updated successfully:', response);
        },
        (error) => {
          console.error('Error updating Description:', error);
        }
      );
    }
  }
}
