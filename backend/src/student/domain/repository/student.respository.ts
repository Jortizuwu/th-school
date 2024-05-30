import { Inject, Injectable } from '@nestjs/common';

import { IStudentModel } from 'src/common/domain/interface/student/model/student-model.interface';
import { OrmStudentRepository } from 'src/common/domain/repositories/orm/student/orm-student.repository';

import { CreateStudentDto } from 'src/student/domain/dto/create-student.dto';
import { IOrmStudentRepository } from 'src/common/domain/interface/student/repository.interface';
import { IStudentRepository } from '../interfaces/student.interface';
import { ICreateStudentDto } from 'src/common/domain/interface/student/dto/create-student-dto.interface';

@Injectable()
export class StudentRepository implements IOrmStudentRepository {
  constructor(
    @Inject(OrmStudentRepository)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async getAllStudents(): Promise<IStudentModel[]> {
    return await this.studentRepository.getAllStudents();
  }
  async getStudent(id: number): Promise<IStudentModel> {
    return await this.studentRepository.getStudent(id);
  }

  async createStudent(student: CreateStudentDto): Promise<void> {
    await this.studentRepository.createStudent(student);
  }

  async updateStudent(id: number, student: ICreateStudentDto): Promise<void> {
    await this.studentRepository.updateStudent(id, student);
  }
  async deleteStudent(id: number): Promise<void> {
    await this.studentRepository.deleteStudent(id);
  }
}
