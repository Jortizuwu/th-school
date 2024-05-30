import { IResponse } from 'src/common/domain/interface/response';
import { IStudentModel } from 'src/common/domain/interface/student/model/student-model.interface';
import { CreateStudentDto } from 'src/student/domain/dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';

interface IStudentGets {
  getAllStudents(): Promise<IStudentModel[]>;
  getStudent(id: number): Promise<IStudentModel>;
}

export interface IUseCaseStudentService extends IStudentGets {
  createStudent(student: CreateStudentDto): Promise<IResponse>;
  updateStudent(id: number, student: UpdateStudentDto): Promise<IResponse>;
  deleteStudent(id: number): Promise<IResponse>;
}

export interface IStudentRepository extends IStudentGets {
  createStudent(student: CreateStudentDto): Promise<void>;
  updateStudent(id: number, student: UpdateStudentDto): Promise<void>;
  deleteStudent(id: number): Promise<void>;
}
