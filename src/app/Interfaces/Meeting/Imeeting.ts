export interface Imeeting {
        id?: Number,
        name: string,
        date: any,
        attendances:any,
        createAt:any,
        page:any,
        pageSize:any
}
export interface MeetingResponse {
    data: Imeeting[];
    totalPages: number;
  }
  
 