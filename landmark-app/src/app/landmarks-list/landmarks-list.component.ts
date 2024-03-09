// landmark-list.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { LandmarkService } from '../services/landmark.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoPopupComponent } from '../photo-popup/photo-popup.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landmars-list',
  templateUrl: './landmarks-list.component.html',
  styleUrls: ['./landmarks-list.component.css']
})
export class LandmarksListComponent implements OnInit {
  allLandmarks: any[] = [];
  filteredLandmarks: any[] = [];
  searchTerm: string = '';
  isAuthenticated: boolean = false;
  editingTitleLandmark: any = null; // Separate variable for editing title
  editingShortInfoLandmark: any = null; // Separate variable for editing short_info

  constructor(
    private landmarkService: LandmarkService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchLandmarks();
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      
      console.log('User authenticated:', isAuthenticated);
    });
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {
    if (!this.isClickedInsideEditBox(event)) {
      this.closeEditingTitleLandmark();
      this.closeEditingShortInfoLandmark();
    }
  }

  isClickedInsideEditBox(event: MouseEvent): boolean {
    const clickedElement = event.target as HTMLElement;
    return (
      clickedElement.tagName === 'INPUT' ||
      clickedElement.tagName === 'TEXTAREA'
    );
  }

  openPhotoPopup(fullSizePhotoUrl: string) {
    const modalRef = this.modalService.open(PhotoPopupComponent);
    modalRef.componentInstance.photoUrl = fullSizePhotoUrl;
  }

  fetchLandmarks() {
    this.landmarkService.getLandmarks().subscribe(
      (response: any) => {
        if (response.results && Array.isArray(response.results)) {
          this.allLandmarks = response.results.map((landmark: any) => ({
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

  editTitle(event: Event, landmark: any) {
    event.preventDefault(); // Prevent link activation
    event.stopPropagation(); // Stop event propagation to prevent link activation

    this.closeEditingTitleLandmark();
    landmark.isEditingTitle = !landmark.isEditingTitle;
    this.editingTitleLandmark = landmark.isEditingTitle ? landmark : null;
  }
  saveTitle(landmark: any, newTitle: string) {
    console.log('Saving title:', newTitle);

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
  
  editShortInfo(landmark: any) {
    this.closeEditingTitleLandmark();
    this.closeEditingShortInfoLandmark();
    landmark.isEditingShortInfo = !landmark.isEditingShortInfo;
    this.editingShortInfoLandmark = landmark.isEditingShortInfo ? landmark : null;
  }

  saveShortInfo(landmark: any, newShortInfo: string) {
    console.log('Saving short info:', newShortInfo);
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
  private closeEditingTitleLandmark(): void {
    if (this.editingTitleLandmark) {
      this.editingTitleLandmark.isEditingTitle = false;
      this.editingTitleLandmark = null;
    }
  }

  private closeEditingShortInfoLandmark(): void {
    if (this.editingShortInfoLandmark) {
      this.editingShortInfoLandmark.isEditingShortInfo = false;
      this.editingShortInfoLandmark = null;
    }
  }
}
