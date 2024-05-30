import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ICreateStudentDto } from 'src/common/domain/interface/student/dto/create-student-dto.interface';
import { IOrmStudentRepository } from 'src/common/domain/interface/student/repository.interface';
import { IStudentModel } from 'src/common/domain/interface/student/model/student-model.interface';
import { StudentEnity } from 'src/common/domain/entities/student.entity';

@Injectable()
export class OrmStudentRepository
  extends Repository<StudentEnity>
  implements IOrmStudentRepository
{
  constructor(dataSource: DataSource) {
    super(StudentEnity, dataSource.createEntityManager());
  }

  async getStudent(id: number): Promise<IStudentModel> {
    return await this.findOneByOrFail({
      id,
    });
  }

  async getAllStudents(): Promise<IStudentModel[]> {
    return await this.find();
  }

  async createStudent(student: ICreateStudentDto): Promise<void> {
    const newStudent = this.create(student);
    await this.save(newStudent);
  }

  async updateStudent(id: number, student: ICreateStudentDto): Promise<void> {
    const dbstudent = await this.findOneByOrFail({
      id,
    });

    dbstudent.name = student.name;
    dbstudent.lastname = student.lastname;
    dbstudent.email = student.email;
    await this.save(dbstudent);
  }
  async deleteStudent(id: number): Promise<void> {
    await this.delete(id);
  }
}
