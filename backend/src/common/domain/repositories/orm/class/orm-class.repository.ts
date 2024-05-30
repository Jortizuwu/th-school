import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ICreateClassDto } from 'src/common/domain/interface/class/dto/create-class-dto.interface';
import { IOrmClassRepository } from 'src/common/domain/interface/class/repository.interface';
import { IClassModel } from 'src/common/domain/interface/class/model/class-model.interface';
import { ClassEnity } from 'src/common/domain/entities/class.entity';
import { IStudentModel } from 'src/common/domain/interface/student/model/student-model.interface';
import { ITeacherModel } from 'src/common/domain/interface/teacher/model/teacher-model.interface';

@Injectable()
export class OrmClassRepository
  extends Repository<ClassEnity>
  implements IOrmClassRepository
{
  constructor(dataSource: DataSource) {
    super(ClassEnity, dataSource.createEntityManager());
  }

  async getClass(id: number): Promise<IClassModel> {
    try {
      const classrom = await this.findOne({
        where: {
          id,
        },
        relations: {
          students: true,
          teacher: true,
        },
      });

      if (!classrom) {
        throw new Error('Class not found');
      }

      return classrom;
    } catch (error) {
      throw error;
    }
  }

  async getAllClasses(): Promise<IClassModel[]> {
    return await this.find({
      relations: {
        students: true,
        teacher: true,
      },
    });
  }

  async createClass(classrom: ICreateClassDto): Promise<void> {
    const newClass = this.create(classrom);
    await this.save(newClass);
  }

  async updateClass(id: number, classrom: ICreateClassDto): Promise<void> {
    const dbclassrom = await this.findOneByOrFail({
      id,
    });

    dbclassrom.name = classrom.name;
    dbclassrom.description = classrom.description;
    await this.save(dbclassrom);
  }
  async deleteClass(id: number): Promise<void> {
    await this.delete(id);
  }

  async addStudents(id: number, studentsId: IStudentModel[]): Promise<void> {
    const dbClass = await this.findOneByOrFail({
      id,
    });
    dbClass.students = studentsId;
    await this.save(dbClass);
  }
  async addTeacher(id: number, teacher: ITeacherModel): Promise<void> {
    const dbClass = await this.findOneByOrFail({
      id,
    });
    dbClass.teacher = teacher;
    await this.save(dbClass);
  }
}
