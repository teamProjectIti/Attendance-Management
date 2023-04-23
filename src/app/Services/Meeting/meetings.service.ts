import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environment/environment';
import { Imeeting, MeetingResponse } from 'src/app/Interfaces/Meeting/Imeeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  url=`${environment.APIURL}`;
  
  constructor(private http:HttpClient,private route:Router ) {  }
  
  entery_Meeting(Imeeting:Imeeting):Observable<Imeeting>
  {
    return this.http.post<Imeeting>(this.url + 'Meeting/createMeeting', Imeeting );
  } 
  get_all_Meeting(page:any,pageSize:any):Observable<MeetingResponse>
  {
    return this.http.get<MeetingResponse>(`${this.url}Meeting/GetAllMeeting?page=${page}&pageSize=${pageSize}`);
  }
  get_Meeting_ByID(Id: number): Observable<Imeeting>
  {
    return this.http.get<Imeeting>(`${this.url}Meeting/GetDetailsMeeting?id=${Id}` );
  }
  //funcation delete
  Delete_Meeting_ByID(id:number):Observable<Imeeting[]>{
    return this.http.delete<Imeeting[]>(`${this.url}Meeting/DeleteMeeting?id=${id}` );
  }
  // funcation Update
  UPdate_Meeting(data:Imeeting): Observable<Imeeting>{
    return this.http.put<Imeeting>(`${this.url}Meeting/UpdateMeeting`, data);
  }
}



