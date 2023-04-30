import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss']
})
export class MeetingFormComponent implements OnInit{
  @Input() Meeting: any;
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() Close = new EventEmitter<any>();

  ngOnInit()
  {
      this.Meeting.data=new Date();
  }
  
  onSave() {
    this.save.emit(this.Meeting);
   }

   onDelete() {
    this.delete.emit(this.Meeting.id);
  }
  onClose() {
    this.Close.emit();
  }
}
