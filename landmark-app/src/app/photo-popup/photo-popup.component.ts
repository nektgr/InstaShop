// photo-popup.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-popup',
  templateUrl: './photo-popup.component.html',
  styleUrls: ['./photo-popup.component.css']
})
export class PhotoPopupComponent {
  @Input() photoUrl: string | undefined;
}
