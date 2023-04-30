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
  UsersList:User[]=[];
  selectedUser: any;
  pageSize=8;
  PageNumber=1;
  CurrentPage=1;
  modalRef?: BsModalRef;
  message?: string;
  searchName:any;
  searchFather:any;
  searchAddress:any;
  
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
  
  closeComponet()
  {
    this.selectedUser = null;
  }

  editUser(user: any) {
    console.log(user);
    this.selectedUser = user;
  }

  deleteUser(id:any)
  {
    if (!confirm("Are You Want Delete This ?"))
    {
        return;
    }
    this.api.deleteUser(id).subscribe(data=>{
      this.UserList.data=this.UserList.data.filter(x=>x.id !== id);
      this.alert.message("Success Delete Item");
      // this.router.navigate(['/slider']); 
      })
  }
  saveUser(user: any) {
    // console.log(user);
    if (!user.id) {
      // Add new user
      this.api.createUser(user).subscribe(res=>{
        this.UserList.data.length + 1;
        this.UserList.data.push(res);
      });
    } else {
      // Update existing Meeting
      this.api.updateUser(user.id,user).subscribe(res=>{
        this.alert.success("Success Update  Item");
        const index = this.UserList.data.findIndex(u => u.id === user.id);
        this.UserList.data[index] = user;
      });
    }
    this.selectedUser = null;
  }
  search()
  {
      this.api.SearchUser(this.searchName,this.searchFather,this.searchAddress).subscribe(res=>{
        this.UserList.data=res;
         console.table(res);
        });
        this.searchName=this.searchFather=this.searchAddress="";
  }
  AddUser( )
  {
    this.selectedUser = this.UserObj;
  }  

}
