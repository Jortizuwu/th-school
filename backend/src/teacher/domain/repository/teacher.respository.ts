import { Inject, Injectable } from '@nestjs/common';

import { ITeacherModel } from 'src/common/domain/interface/teacher/model/teacher-model.interface';
import { OrmTeacherRepository } from 'src/common/domain/repositories/orm/teacher/orm-teacher.repository';

import { CreateTeacherDto } from 'src/teacher/domain/dto/create-teacher.dto';
import { IOrmTeacherRepository } from 'src/common/domain/interface/teacher/repository.interface';
import { ITeacherRepository } from '../interfaces/teacher.interface';
import { ICreateTeacherDto } from 'src/common/domain/interface/teacher/dto/create-teacher-dto.interface';

@Injectable()
export class TeacherRepository implements IOrmTeacherRepository {
  constructor(
    @Inject(OrmTeacherRepository)
    private readonly studentRepository: ITeacherRepository,
  ) {}

  async getAllTeachers(): Promise<ITeacherModel[]> {
    return await this.studentRepository.getAllTeachers();
  }
  async getTeacher(id: number): Promise<ITeacherModel> {
    return await this.studentRepository.getTeacher(id);
  }

  async createTeacher(teacher: CreateTeacherDto): Promise<void> {
    await this.studentRepository.createTeacher(teacher);
  }

  async updateTeacher(id: number, teacher: ICreateTeacherDto): Promise<void> {
    await this.studentRepository.updateTeacher(id, teacher);
  }
  async deleteTeacher(id: number): Promise<void> {
    await this.studentRepository.deleteTeacher(id);
  }
}
