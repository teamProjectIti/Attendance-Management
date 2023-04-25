import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './Component/slider/slider.component';
import { MeetingComponent } from './Pages/Meetings/meeting/meeting.component';
import { MainLayoutMeetingComponent } from './Pages/Meetings/main-layout-meeting/main-layout-meeting.component';
import { AccountComponent } from './Pages/User/account/account.component';

const routes: Routes = [

  {path:'slider', component:SliderComponent},
  {path:'', redirectTo:'/slider', pathMatch:'full'},


  {path:'', component:MainLayoutMeetingComponent,children:[
    {path:'Meeting', component:MeetingComponent}, 
    {path:'User', component:AccountComponent}, 
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
