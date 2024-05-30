import { ICreateStudentDto } from './dto/create-student-dto.interface';
import { IStudentModel } from './model/student-model.interface';

export abstract class IOrmStudentRepository {
  abstract getAllStudents(): Promise<IStudentModel[]>;
  abstract getStudent(id: number): Promise<IStudentModel>;
  abstract createStudent(student: ICreateStudentDto): Promise<void>;
  abstract updateStudent(id: number, student: ICreateStudentDto): Promise<void>;
  abstract deleteStudent(id: number): Promise<void>;
}
