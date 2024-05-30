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

import {
  AddStudentsToClassDto,
  AddTeacherToClassDto,
  CreateClassDto,
} from '../domain/dto/create-class.dto';
import { IResponse } from 'src/common/domain/interface/response';
import { IUseCaseClassService } from '../domain/interfaces/class.interface';
import { IClassModel } from 'src/common/domain/interface/class/model/class-model.interface';
import { ClassUseCaseService } from '../application/use-case/class.use-case';

@Controller('class')
export class ClassController {
  constructor(
    @Inject(ClassUseCaseService)
    private readonly classService: IUseCaseClassService,
  ) {}

  @Get()
  findAll(): Promise<IClassModel[]> {
    return this.classService.getAllClasses();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IClassModel> {
    return this.classService.getClass(+id);
  }

  @Post()
  create(@Body() createClassDto: CreateClassDto): Promise<IResponse> {
    return this.classService.createClass(createClassDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createClassDto: CreateClassDto,
  ): Promise<IResponse> {
    return this.classService.updateClass(+id, createClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse> {
    return this.classService.deleteClass(+id);
  }

  @Post(':id/assign-students')
  addStudents(
    @Param('id') id: string,
    @Body() body: AddStudentsToClassDto,
  ): Promise<IResponse> {
    return this.classService.addStudents(+id, body.studentsId);
  }

  @Post(':id/assign-teacher')
  addTeacher(
    @Param('id') id: string,
    @Body() body: AddTeacherToClassDto,
  ): Promise<IResponse> {
    return this.classService.addTeacher(+id, body.teacherId);
  }
}
