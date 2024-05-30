import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ICreateTeacherDto } from 'src/common/domain/interface/teacher/dto/create-teacher-dto.interface';
import { IOrmTeacherRepository } from 'src/common/domain/interface/teacher/repository.interface';
import { ITeacherModel } from 'src/common/domain/interface/teacher/model/teacher-model.interface';
import { TeacherEnity } from 'src/common/domain/entities/teacher.entity';

@Injectable()
export class OrmTeacherRepository
  extends Repository<TeacherEnity>
  implements IOrmTeacherRepository
{
  constructor(dataSource: DataSource) {
    super(TeacherEnity, dataSource.createEntityManager());
  }

  async getTeacher(id: number): Promise<ITeacherModel> {
    return await this.findOneByOrFail({
      id,
    });
  }

  async getAllTeachers(): Promise<ITeacherModel[]> {
    return await this.find();
  }

  async createTeacher(teacher: ICreateTeacherDto): Promise<void> {
    const newTeacher = this.create(teacher);
    await this.save(newTeacher);
  }

  async updateTeacher(id: number, teacher: ICreateTeacherDto): Promise<void> {
    const dbTeacher = await this.findOneByOrFail({
      id,
    });
    dbTeacher.name = teacher.name;
    dbTeacher.lastname = teacher.lastname;
    dbTeacher.email = teacher.email;
    await this.save(dbTeacher);
  }
  async deleteTeacher(id: number): Promise<void> {
    await this.delete(id);
  }
}
