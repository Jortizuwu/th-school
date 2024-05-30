import { IResponse } from 'src/common/domain/interface/response';
import { ITeacherModel } from 'src/common/domain/interface/teacher/model/teacher-model.interface';
import { CreateTeacherDto } from 'src/teacher/domain/dto/create-teacher.dto';

interface ITeacherGets {
  getAllTeachers(): Promise<ITeacherModel[]>;
  getTeacher(id: number): Promise<ITeacherModel>;
}

export interface IUseCaseTeacherService extends ITeacherGets {
  createTeacher(Teacher: CreateTeacherDto): Promise<IResponse>;
  updateTeacher(id: number, Teacher: CreateTeacherDto): Promise<IResponse>;
  deleteTeacher(id: number): Promise<IResponse>;
}

export interface ITeacherRepository extends ITeacherGets {
  createTeacher(Teacher: CreateTeacherDto): Promise<void>;
  updateTeacher(id: number, Teacher: CreateTeacherDto): Promise<void>;
  deleteTeacher(id: number): Promise<void>;
}
