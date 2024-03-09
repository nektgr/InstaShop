// landmark-detail.component.ts
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Landmark } from '../models/landmark.model';
import { LandmarkService } from '../services/landmark.service';


@Component({
  selector: 'app-landmark-detail',
  templateUrl: './landmark-detail.component.html',
  styleUrls: ['./landmark-detail.component.css'],
})
export class LandmarkDetailComponent implements OnInit {
  
  landmark: Landmark | undefined;

  constructor(
    private route: ActivatedRoute,
    private landmarkService: LandmarkService,
  ) {}

  ngOnInit(): void {
      this.fetchLandmark(); // Fetch landmarks after authentication status is updated
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
        // Handle the error, show a user-friendly message, or redirect to an error page.
      }
    }
  }
  
    
  }