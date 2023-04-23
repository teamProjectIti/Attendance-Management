import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Imeeting, MeetingResponse } from 'src/app/Interfaces/Meeting/Imeeting';
import { MeetingsService } from 'src/app/Services/Meeting/meetings.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  MeetingList:Imeeting[]=[];
  selectedUser: any;
  page: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  private id:number=0;
  meeting:Imeeting={} as Imeeting;
  dataForm: any;



  constructor(private api:MeetingsService,private fb: FormBuilder,private activatedRoute:ActivatedRoute,private router: Router) { }
  

  ngOnInit(): void {
     this.getData();
  }

  getData(): void {
    this.api.get_all_Meeting(this.page,this.pageSize).subscribe((res: MeetingResponse)=>{
      this.MeetingList = res.data;
      this.totalPages = res.totalPages;
       console.log(this.MeetingList);
       });
 
     this.activatedRoute.paramMap.subscribe(paramMap=>{
       this.id=Number(paramMap.get("id"));
       if(this.id){
         this.api.get_Meeting_ByID(this.id).subscribe(data=>{
         this.meeting=data;
       });
       } 
 
     });
  }
  prevPage() {
    this.page--;
    this.getData();
  }

  nextPage() {
    this.page++;
    this.getData();
  }

  

  editUser(user: any) {
    this.selectedUser = user;
  }

  deleteUser(id: any) {
    this.api.Delete_Meeting_ByID(id).subscribe(res=>{
      this.MeetingList = this.MeetingList.filter(u => u.id != id);
      this.selectedUser = null;
      console.log(this.MeetingList);
      console.log(res);
    })
   
  }
  saveUser(meeting: any) {
    if (!meeting.id) {
      // Add new user
      this.api.entery_Meeting(meeting).subscribe(res=>{
        meeting.id = this.MeetingList.length + 1;
        this.MeetingList.push(meeting);
      });
    } else {
      // Update existing Meeting
      this.api.UPdate_Meeting(meeting).subscribe(res=>{
        const index = this.MeetingList.findIndex(u => u.id === meeting.id);
        this.MeetingList[index] = meeting;
      })
    }
    this.selectedUser = null;
  }

  }
  
 