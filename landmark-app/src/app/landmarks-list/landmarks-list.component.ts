// landmarks-list.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { LandmarkService } from '../services/landmark.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoPopupComponent } from '../photo-popup/photo-popup.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Landmark, LandmarkList } from '../models/landmark.model';
import { environment } from '../../enviroments/enviroment';
@Component({
  selector: 'app-landmarks-list', // Fixed typo in the selector
  templateUrl: './landmarks-list.component.html',
  styleUrls: ['./landmarks-list.component.css']
})
export class LandmarksListComponent implements OnInit {
  environment = environment;
  allLandmarks: Landmark[] = [];
  filteredLandmarks: Landmark[] = [];
  searchTerm: string = '';
  isAuthenticated: boolean = false;
  private authSubscription: Subscription = new Subscription;

  constructor(
    private landmarkService: LandmarkService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchLandmarks();
    this.authSubscription = this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  openPhotoPopup(fullSizePhotoUrl: string) {
    // Open a photo popup modal
    const modalRef = this.modalService.open(PhotoPopupComponent);
    modalRef.componentInstance.photoUrl = fullSizePhotoUrl;
  }

  fetchLandmarks() {
    // Fetch landmarks from the service
    this.landmarkService.getLandmarks().subscribe(
      (response: LandmarkList) => {
        if (response.results && Array.isArray(response.results)) {
          // Map and store landmarks
          this.allLandmarks = response.results.map((landmark: Landmark) => ({ ...landmark }));
          this.filteredLandmarks = [...this.allLandmarks];
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

  searchLandmarks() {
    // Filter landmarks based on the search term
    if (!this.searchTerm) {
      this.filteredLandmarks = [...this.allLandmarks];
      this.sortLandmarks();
    } else {
      this.filteredLandmarks = this.allLandmarks.filter((landmark) =>
        landmark.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  sortLandmarks() {
    // Sort landmarks based on the 'order' property
    this.filteredLandmarks.sort((a, b) => a.order - b.order);
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
}
