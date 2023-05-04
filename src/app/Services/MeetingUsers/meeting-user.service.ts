import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeetingUserDto } from 'src/app/Interfaces/meetingUser/MeetingUserDto';
 
@Injectable({
  providedIn: 'root'
})
export class MeetingUserService {
  private baseUrl = 'http://localhost:5000/api/meetinguser';

  constructor(private http: HttpClient) { }

  getAllMeetingUser(page: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}/GetAllMeetingUser?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  createMeetingUser(meetingUser: MeetingUserDto): Observable<any> {
    const url = `${this.baseUrl}/createMeetingUser`;
    return this.http.post(url, meetingUser);
  }

  updateMeetingUser(meetingUser: MeetingUserDto): Observable<any> {
    const url = `${this.baseUrl}/UpdateMeetingUser`;
    return this.http.put(url, meetingUser);
  }

  deleteMeetingUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/DeleteMeetingUser?id=${id}`;
    return this.http.delete(url);
  }

  getDetailsMeetingUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/GetDetailsMeetingUser?id=${id}`;
    return this.http.get(url);
  }
}
