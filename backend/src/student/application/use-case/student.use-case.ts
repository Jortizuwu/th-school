import { Inject, Injectable } from '@nestjs/common';
import { IResponse } from 'src/common/domain/interface/response';

import { IStudentModel } from 'src/common/domain/interface/student/model/student-model.interface';
import { OrmStudentRepository } from 'src/common/domain/repositories/orm/student/orm-student.repository';

import { CreateStudentDto } from 'src/student/domain/dto/create-student.dto';
import {
  IUseCaseStudentService,
  IStudentRepository,
} from 'src/student/domain/interfaces/student.interface';

@Injectable()
export class StudentUseCaseService implements IUseCaseStudentService {
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

  async createStudent(student: CreateStudentDto): Promise<IResponse> {
    try {
      await this.studentRepository.createStudent(student);
      return {
        code: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }
  async updateStudent(
    id: number,
    student: CreateStudentDto,
  ): Promise<IResponse> {
    try {
      await this.studentRepository.updateStudent(id, student);
      return {
        code: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }
  async deleteStudent(id: number): Promise<IResponse> {
    try {
      await this.studentRepository.deleteStudent(id);
      return {
        code: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }
}
