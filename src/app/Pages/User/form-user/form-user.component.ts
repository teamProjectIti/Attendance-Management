import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/Interfaces/User';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
  @Input() user: any;
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() Close = new EventEmitter<any>();

  ngOnInit()
  {
      this.user.data=new Date();
  }
   
  
  onSave() {
    this.save.emit(this.user);
   }

   onDelete() {
    this.delete.emit(this.user.id);
  }
  onClose() {
    this.Close.emit();
  }

  onCheckboxChange(event: any) {
    this.user.Status = event.target.checked;
  }
}
