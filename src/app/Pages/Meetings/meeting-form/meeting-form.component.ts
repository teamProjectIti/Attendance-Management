import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss']
})
export class MeetingFormComponent {
  @Input() Meeting: any;
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onSave() {
    this.save.emit(this.Meeting);
  }

  onDelete() {
    this.delete.emit(this.Meeting.id);
  }
}
