import { ICreateTeacherDto } from './dto/create-teacher-dto.interface';
import { ITeacherModel } from './model/teacher-model.interface';

export abstract class IOrmTeacherRepository {
  abstract getAllTeachers(): Promise<ITeacherModel[]>;
  abstract getTeacher(id: number): Promise<ITeacherModel>;
  abstract createTeacher(teacher: ICreateTeacherDto): Promise<void>;
  abstract updateTeacher(id: number, teacher: ICreateTeacherDto): Promise<void>;
  abstract deleteTeacher(id: number): Promise<void>;
}
