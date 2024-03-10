// landmark-list.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { LandmarkService } from '../services/landmark.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoPopupComponent } from '../photo-popup/photo-popup.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Landmark, LandmarkList } from '../models/landmark.model';

@Component({
  selector: 'app-landmars-list',
  templateUrl: './landmarks-list.component.html',
  styleUrls: ['./landmarks-list.component.css']
})
export class LandmarksListComponent implements OnInit {
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
    this.authSubscription=this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      
      console.log('User authenticated:', isAuthenticated);
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  openPhotoPopup(fullSizePhotoUrl: string) {
    const modalRef = this.modalService.open(PhotoPopupComponent);
    modalRef.componentInstance.photoUrl = fullSizePhotoUrl;
  }

  fetchLandmarks() {
    this.landmarkService.getLandmarks().subscribe(
      (response: LandmarkList) => {
        if (response.results && Array.isArray(response.results)) {
          this.allLandmarks = response.results.map((landmark: Landmark) => ({
            ...landmark,
          }));
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
    this.filteredLandmarks.sort((a, b) => a.order - b.order);
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

}