import { Inject, Injectable } from '@nestjs/common';
import { IResponse } from 'src/common/domain/interface/response';

import { ITeacherModel } from 'src/common/domain/interface/teacher/model/teacher-model.interface';
import { OrmTeacherRepository } from 'src/common/domain/repositories/orm/teacher/orm-teacher.repository';

import { CreateTeacherDto } from 'src/teacher/domain/dto/create-teacher.dto';
import {
  IUseCaseTeacherService,
  ITeacherRepository,
} from 'src/teacher/domain/interfaces/teacher.interface';

@Injectable()
export class TeacherUseCaseService implements IUseCaseTeacherService {
  constructor(
    @Inject(OrmTeacherRepository)
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  async getAllTeachers(): Promise<ITeacherModel[]> {
    return await this.teacherRepository.getAllTeachers();
  }
  async getTeacher(id: number): Promise<ITeacherModel> {
    return await this.teacherRepository.getTeacher(id);
  }

  async createTeacher(teacher: CreateTeacherDto): Promise<IResponse> {
    try {
      await this.teacherRepository.createTeacher(teacher);
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
  async updateTeacher(
    id: number,
    Teacher: CreateTeacherDto,
  ): Promise<IResponse> {
    try {
      await this.teacherRepository.updateTeacher(id, Teacher);
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
  async deleteTeacher(id: number): Promise<IResponse> {
    try {
      await this.teacherRepository.deleteTeacher(id);
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
