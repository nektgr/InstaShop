import { Component, OnInit } from '@angular/core';
import { LandmarkService } from '../services/landmark.service';
import { Landmark, LandmarkList } from '../models/landmark.model';
@Component({
  selector: 'app-landmarks-list',
  templateUrl: './landmarks-list.component.html',
  styleUrl: './landmarks-list.component.css'
})
export class LandmarksListComponent implements OnInit {
  allLandmarks: Landmark[] = [];
  filteredLandmarks: Landmark[] = [];
  searchTerm: string = '';
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
            isEditingTitle: false,
            isEditingShortInfo: false,
          }));
          this.filterAndSortLandmarks();
        } else {
          console.error('Invalid API response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching landmarks', error);
      }
    );
  }

  filterAndSortLandmarks() {
    if (!this.searchTerm) {
      this.filteredLandmarks = [...this.allLandmarks];
    } else {
      this.filteredLandmarks = this.allLandmarks.filter((landmark) =>
        landmark.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.sortLandmarks();
  }

  sortLandmarks() {
    this.filteredLandmarks.sort((a, b) => a.order - b.order);
  }

  searchLandmarks() {
    this.filterAndSortLandmarks();
  }
}

