export type CreateClassRoom = {
  name: string;
  description: string;
};

export type UpdateClassRoomAdd = {
  name: string;
  description: string;
  teacherId: string;
  studentsId: string[];
};
