import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User, UserResponse } from 'src/app/Interfaces/User';
import { AlertService } from 'src/app/Services/AlertNotifcation/AlertService';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
 
export class AccountComponent implements OnInit {
  UserList:UserResponse={} as UserResponse ;
  pageSize=8;
  PageNumber=1;
  CurrentPage=1;
  modalRef?: BsModalRef;
  message?: string;
  
  
  UserObj:User={} as User;
  private id:number=0;

  constructor(private alert:AlertService,private modalService: BsModalService,private api:UserService,private activatedRoute:ActivatedRoute,private router: Router) { }
  ngOnInit(): void {
    
    this.loadUser();
  }

  loadUser()
  {
    this.api.getUsers(this.PageNumber,this.pageSize).subscribe((res:UserResponse)=>{
      console.log(res.data);
      this.UserList.data=res.data;
      this.UserList.totalPages=res.totalPages;

      });

    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.id=Number(paramMap.get("id"));
      if(this.id){
        this.api.getUserById(this.id).subscribe(data=>{
        this.UserObj=data;
      });
      } 
    });
  }
  pageChanged(event:any)
  {
    this.PageNumber=event.page;
    this.loadUser();
  }
  saveCategory()
  {
    if(this.id)
    {
      console.log(this.id);
      this.api.updateUser(this.id,this.UserObj).subscribe(product=>{
        this.router.navigate(['/slider']);
      });
    }
    else{
     // console.log(this.brand);
      this.api.createUser(this.UserObj).subscribe(prd=>{
     // this.alert.message("Success insert data");
      this.router.navigate(['/slider']);
    },err=>{
     // this.alert.error("faild insert data");
      console.log(err);
    });
    }
  }
  deleteItem(id:any)
  {
    this.api.deleteUser(id).subscribe(data=>{
      this.UserList.data=this.UserList.data.filter(x=>x.id !== id);
      this.alert.message("Success Delete Item");
      // this.router.navigate(['/slider']); 
      })
  }

   
}
