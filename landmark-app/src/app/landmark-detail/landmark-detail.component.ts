// landmark-detail.component.ts
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Landmark } from '../models/landmark.model';
import { LandmarkService } from '../services/landmark.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landmark-detail',
  templateUrl: './landmark-detail.component.html',
  styleUrls: ['./landmark-detail.component.css'],
})
export class LandmarkDetailComponent implements OnInit {
  
  landmark: Landmark | undefined;
  isAuthenticated: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private landmarkService: LandmarkService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      this.fetchLandmark();
      this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        
        console.log('User authenticated:', isAuthenticated);
      });
  }
  
  private async fetchLandmark() {
    console.log('Fetching landmark data');
    const landmarkId = this.route.snapshot.paramMap.get('id');
    if (landmarkId) {
      try {
        const result = await this.landmarkService.getLandmarkById(landmarkId).toPromise();
        this.landmark = result;
      } catch (error) {
        console.error('Error fetching landmark', error);
      }
    }
  }
  onTitleChange(newTitle: string, landmark: any) {
    console.log('Title changed:', newTitle);
  
    // Make a PUT request to update the title on the server
    this.landmarkService.updateLandmarkTitle(landmark.objectId, newTitle)
      .subscribe(
        (response) => {
          console.log('Title updated successfully:', response);
        },
        (error) => {
          console.error('Error updating title:', error);
        }
      );
  }
  
  onShortInfoChange(newShortInfo: string, landmark: any) {
    console.log('Short info changed:', newShortInfo);
  
    // Make a PUT request to update the short info on the server
    this.landmarkService.updateLandmarkShortInfo(landmark.objectId, newShortInfo)
      .subscribe(
        (response) => {
          console.log('Short info updated successfully:', response);
        },
        (error) => {
          console.error('Error updating short info:', error);
        }
      );
  }

  onDescriptionChange(newDescription: string, landmark: any) {
    console.log('Description changed:', newDescription);
  
    // Make a PUT request to update the Description on the server
    this.landmarkService.updateLandmarkDescription(landmark.objectId, newDescription)
      .subscribe(
        (response) => {
          console.log('Description updated successfully:', response);
        },
        (error) => {
          console.error('Error updating Description:', error);
        }
      );
  }
  
    
  }