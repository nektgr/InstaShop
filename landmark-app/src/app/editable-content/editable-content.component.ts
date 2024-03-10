// editable-content.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-content',
  templateUrl: './editable-content.component.html',
  styleUrls: ['./editable-content.component.css']
})
export class EditableContentComponent {
  @Input() isAuthenticated: boolean = false;
  @Input() content: string = '';
  @Input() link?: string 
  @Output() editedContentChange = new EventEmitter<string>();

  static currentlyEditing: EditableContentComponent | null = null;
  isEditMode: boolean = false;
  editedContent: string = '';

  enterEditMode() {
    if (EditableContentComponent.currentlyEditing && EditableContentComponent.currentlyEditing !== this) {
      EditableContentComponent.currentlyEditing.saveContent();
    }

    EditableContentComponent.currentlyEditing = this;
    this.editedContent = this.content;
    this.isEditMode = true;
  }

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

  calculateRowCount(): number {
    return this.content.split('\n').length;
  }

  calculateColCount(): number {
    const maxLineLength = Math.max(...this.content.split('\n').map(line => line.length));
    return maxLineLength || 1;
  }
}
