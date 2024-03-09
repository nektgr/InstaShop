// editable-content.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editable-content',
  templateUrl: './editable-content.component.html',
  styleUrls: ['./editable-content.component.css']
})
export class EditableContentComponent {
  @Input() isAuthenticated: boolean = false;
  @Input() content: string = '';

  static currentlyEditing: EditableContentComponent | null = null;

  isEditMode: boolean = false;
  editedContent: string = '';

  enterEditMode() {
    if (EditableContentComponent.currentlyEditing && EditableContentComponent.currentlyEditing !== this) {
      // Another box is currently in edit mode, exit edit mode for that box first
      EditableContentComponent.currentlyEditing.saveContent();
    }

    EditableContentComponent.currentlyEditing = this;

    this.editedContent = this.content;
    this.isEditMode = true;
  }

  saveContent() {
    if (this.isEditMode) {
      console.log('Content saved:', this.editedContent);
      this.content = this.editedContent;
      this.isEditMode = false;

      // Reset currentlyEditing when saving
      EditableContentComponent.currentlyEditing = null;
    }
  }

  calculateRowCount(): number {
    // Count the number of lines in the initial content
    return this.content.split('\n').length;
  }

  calculateTextareaClasses(): string {
    const rowCount = this.calculateRowCount();

    // Conditionally apply classes based on the number of rows
    if (rowCount > 5) {
      return 'w-full h-150 resize-y'; // Apply these classes if there are more than 5 rows
    } else {
      return 'w-full h-40 resize-y'; // Apply these classes for 5 rows or fewer (adjust as needed)
    }
  }

  calculateColCount(): number {
    // Find the maximum number of characters in a line in the initial content
    const maxLineLength = Math.max(...this.content.split('\n').map(line => line.length));
    return maxLineLength || 50; // Set a default value if there are no lines
  }
}
