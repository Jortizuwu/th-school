import { IStudentModel } from '../student/model/student-model.interface';
import { ITeacherModel } from '../teacher/model/teacher-model.interface';
import { ICreateClassDto } from './dto/create-class-dto.interface';
import { IClassModel } from './model/class-model.interface';

export abstract class IOrmClassRepository {
  abstract getClass(id: number): Promise<IClassModel>;
  abstract getAllClasses(id: number): Promise<IClassModel[]>;

  abstract createClass(createMatchDto: ICreateClassDto): Promise<void>;
  abstract deleteClass(id: number): Promise<void>;
  abstract updateClass(id: number, classrom: ICreateClassDto): Promise<void>;

  abstract addStudents(id: number, studentsId: IStudentModel[]): Promise<void>;
  abstract addTeacher(id: number, teacher: ITeacherModel): Promise<void>;
}
