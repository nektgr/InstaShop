import { Component, OnInit } from '@angular/core';
import { LandmarkService } from '../services/landmark.service';
import { Landmark, LandmarkList } from '../models/landmark.model';
@Component({
  selector: 'app-landamarks-list',
  templateUrl: './landamarks-list.component.html',
  styleUrl: './landamarks-list.component.css'
})
export class LandamarksListComponent implements OnInit {
  allLandmarks: Landmark[] = [];

  constructor(private landmarkService: LandmarkService) {
  }

  ngOnInit(): void {
    this.fetchLandmarks();
  }

  fetchLandmarks() {
    this.landmarkService.getLandmarks().subscribe(
      (response: any) => {
        if (response.results && Array.isArray(response.results)) {
          this.allLandmarks = response.results.map((landmark: any) => ({
            ...landmark,
          }));
          this.sortLandmarks();
        } else {
          console.error('Invalid API response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching landmarks', error);
      }
    );
  }

  sortLandmarks() {
    this.allLandmarks.sort((a, b) => a.order - b.order);
  }

}

