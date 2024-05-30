import { IStudentModel } from '../../student/model/student-model.interface';
import { ITeacherModel } from '../../teacher/model/teacher-model.interface';

export class IClassModel {
  id: number;
  name: string;
  description: string;
  teacher: ITeacherModel;
  students: IStudentModel[];
  createdate: Date;
  updateddate: Date;
}
