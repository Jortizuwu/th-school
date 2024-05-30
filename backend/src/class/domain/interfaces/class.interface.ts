import { IResponse } from 'src/common/domain/interface/response';
import { IClassModel } from 'src/common/domain/interface/class/model/class-model.interface';
import { CreateClassDto } from 'src/class/domain/dto/create-class.dto';
import { UpdateClassDto } from '../dto/update-class.dto';
import { IStudentModel } from 'src/common/domain/interface/student/model/student-model.interface';
import { ITeacherModel } from 'src/common/domain/interface/teacher/model/teacher-model.interface';

interface IClassGets {
  getAllClasses(): Promise<IClassModel[]>;
  getClass(id: number): Promise<IClassModel>;
}

export interface IUseCaseClassService extends IClassGets {
  createClass(classrom: CreateClassDto): Promise<IResponse>;
  updateClass(id: number, classrom: UpdateClassDto): Promise<IResponse>;
  deleteClass(id: number): Promise<IResponse>;

  addStudents(id: number, studentsId: number[]): Promise<IResponse>;
  addTeacher(id: number, teacher: number): Promise<IResponse>;
}

export interface IClassRepository extends IClassGets {
  createClass(classrom: CreateClassDto): Promise<void>;
  updateClass(id: number, classrom: UpdateClassDto): Promise<void>;
  deleteClass(id: number): Promise<void>;

  addStudents(id: number, studentsId: IStudentModel[]): Promise<void>;
  addTeacher(id: number, teacher: ITeacherModel): Promise<void>;
}
