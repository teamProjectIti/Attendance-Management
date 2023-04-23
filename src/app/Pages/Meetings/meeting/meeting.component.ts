import { Component, OnInit } from '@angular/core';
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
  page: number = 1;
  pageSize: number = 2;
  totalPages: number = 0;
  private id:number=0;
  meeting:Imeeting={} as Imeeting;

  constructor(private api:MeetingsService,private activatedRoute:ActivatedRoute,private router: Router) { }
  

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

  }
  
 