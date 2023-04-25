export interface User {
    id?: number;
    userName: string;
    address : string;
    City: string;
    BrithDate: any;
    nameFatherChurch ?: string;
    Status: string;
    CountChildren?: number;
    NameJop?: number;
    IdFaceBook?: number;
    mobile: number;
  }

  export interface UserResponse {
    data: User[];
    totalPages: number;
  }
  