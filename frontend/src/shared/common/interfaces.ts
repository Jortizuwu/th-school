// Students
export interface ListStudentsResponse {
  data: Student[];
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface IGetStudentResponse {
  data: Student;
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface IUpdateStudentResponse {
  data: {
    code: number;
    message: string;
  };
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface Student {
  id: number;
  name: string;
  lastname: string;
  email: string;
  createdate: Date;
  updateddate: Date;
}

// Teachers
export interface ListTeachersResponse {
  data: Teacher[];
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface IGetTeacherResponse {
  data: Teacher;
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface IUpdateTeacherResponse {
  data: {
    code: number;
    message: string;
  };
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface Teacher {
  id: number;
  name: string;
  lastname: string;
  email: string;
  createdate: Date;
  updateddate: Date;
}

// ClassRooms
export interface ListClassRoomsResponse {
  data: ClassRoom[];
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface IGetClassRoomResponse {
  data: ClassRoom;
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface IUpdateClassRoomResponse {
  data: {
    code: number;
    message: string;
  };
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

export interface ClassRoom {
  id: number;
  name: string;
  description: string;
  teacher: Teacher | null;
  students: Student[];
  createdate: Date;
  updateddate: Date;
}
