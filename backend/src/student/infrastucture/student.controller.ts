import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Put,
  Delete,
} from '@nestjs/common';

import { CreateStudentDto } from '../domain/dto/create-student.dto';
import { IResponse } from 'src/common/domain/interface/response';
import { IUseCaseStudentService } from '../domain/interfaces/student.interface';
import { IStudentModel } from 'src/common/domain/interface/student/model/student-model.interface';
import { StudentUseCaseService } from '../application/use-case/student.use-case';

@Controller('student')
export class StudentController {
  constructor(
    @Inject(StudentUseCaseService)
    private readonly studentService: IUseCaseStudentService,
  ) {}

  @Get()
  findAll(): Promise<IStudentModel[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IStudentModel> {
    return this.studentService.getStudent(+id);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Promise<IResponse> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<IResponse> {
    return this.studentService.updateStudent(+id, createStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse> {
    return this.studentService.deleteStudent(+id);
  }
}
