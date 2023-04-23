import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Component/HomePage/home/home.component';
import { MainComponent } from './Component/Header/main/main.component';
import { FooterComponent } from './Component/Footer/footer/footer.component';
import { AccountComponent } from './Pages/User/account/account.component';
 import { AngularToastifyModule } from 'angular-toastify';

import { AttendanceComponent } from './Pages/Attendances/attendance/attendance.component';
import { LoadingInterceptorService } from './Interceptor/loading-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingService } from './Services/Loading/LoadingService';
import { LoadingSpinnerComponent } from './Component/Animation/loading-spinner/loading-spinner.component';
import { MeetingComponent } from './Pages/Meetings/meeting/meeting.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    FooterComponent,
    AttendanceComponent,
    MainComponent,
    AccountComponent,
    LoadingSpinnerComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularToastifyModule,HttpClientModule
  ],
  providers: [
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true },
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
