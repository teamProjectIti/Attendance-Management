export interface User {
    id?: number;
    userName: string;
    address : string;
    city: any;
    brithDate: any;
    nameFatherChurch ?: any;
    status: boolean;
    countChildren?: number;
    nameJop?: number;
    IdFaceBook?: string;
    mobile: number;
  }

  export interface UserResponse {
    data: User[];
    totalPages: number;
  }
 