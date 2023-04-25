import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Imeeting, MeetingResponse } from 'src/app/Interfaces/Meeting/Imeeting';
import { AlertService } from 'src/app/Services/AlertNotifcation/AlertService';
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
  pageSize: number = 5;
  totalPages: number = 0;
  private id:number=0;
  meeting:Imeeting={} as Imeeting;
  dataForm: any;



  constructor(private alert:AlertService,private api:MeetingsService,private fb: FormBuilder,private activatedRoute:ActivatedRoute,private router: Router) { }
  

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
   AddMeeting(meeting:any)
  {
    this.selectedUser = meeting;
  }  

  editUser(meeting: any) {
    this.selectedUser = meeting;
  }

  deleteUser(id: any) {
    this.api.Delete_Meeting_ByID(id).subscribe(res=>{
      this.MeetingList = this.MeetingList.filter(u => u.id != id);
      this.selectedUser = null;
      this.alert.message("Success Delete Item");
      console.log(this.MeetingList);
    })
   
  }
  saveUser(meeting: any) {
    console.log(meeting);
    if (!meeting.id) {
      // Add new user
      this.api.entery_Meeting(meeting).subscribe(res=>{
        this.MeetingList.length + 1;
        this.MeetingList.push(res);
      });
    } else {
      // Update existing Meeting
      this.api.UPdate_Meeting(meeting).subscribe(res=>{
        this.alert.success("Success Update  Item");
        const index = this.MeetingList.findIndex(u => u.id === meeting.id);
        this.MeetingList[index] = meeting;
      });
    }
    this.selectedUser = null;
  }

  }
  
 