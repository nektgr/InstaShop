// editable-content.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-content',
  templateUrl: './editable-content.component.html',
  styleUrls: ['./editable-content.component.css']
})
export class EditableContentComponent {
  // Input properties for the component
  @Input() isAuthenticated: boolean = false;
  @Input() content: string = '';
  @Input() link?: string;
  
  // Output property to emit edited content changes
  @Output() editedContentChange = new EventEmitter<string>();

  // Static variable to keep track of the currently editing instance
  static currentlyEditing: EditableContentComponent | null = null;

  // Instance variables
  isEditMode: boolean = false;
  editedContent: string = '';

  // Method to enter edit mode
  enterEditMode() {
    if (EditableContentComponent.currentlyEditing && EditableContentComponent.currentlyEditing !== this) {
      EditableContentComponent.currentlyEditing.saveContent();
    }

    EditableContentComponent.currentlyEditing = this;
    this.editedContent = this.content;
    this.isEditMode = true;
  }

  // Method to save content changes
  saveContent() {
    if (this.isEditMode) {
      // Check if the content has changed
      if (this.content !== this.editedContent) {
        console.log('Content saved:', this.editedContent);
        this.content = this.editedContent;
        this.editedContentChange.emit(this.editedContent);
      }

      this.isEditMode = false;
      EditableContentComponent.currentlyEditing = null;
    }
  }

  // Method to calculate the number of rows in the content
  calculateRowCount(): number {
    return this.content.split('\n').length;
  }

  // Method to calculate the number of columns in the content
  calculateColCount(): number {
    const maxLineLength = Math.max(...this.content.split('\n').map(line => line.length));
    return maxLineLength || 1;
  }
}
