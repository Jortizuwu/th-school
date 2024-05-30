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

import { CreateTeacherDto } from '../domain/dto/create-teacher.dto';
import { IResponse } from 'src/common/domain/interface/response';
import { IUseCaseTeacherService } from '../domain/interfaces/teacher.interface';
import { ITeacherModel } from 'src/common/domain/interface/teacher/model/teacher-model.interface';
import { TeacherUseCaseService } from '../application/use-case/teacher.use-case';

@Controller('teacher')
export class TeacherController {
  constructor(
    @Inject(TeacherUseCaseService)
    private readonly teacherService: IUseCaseTeacherService,
  ) {}

  @Get()
  findAll(): Promise<ITeacherModel[]> {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ITeacherModel> {
    return this.teacherService.getTeacher(+id);
  }

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<IResponse> {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createTeacherDto: CreateTeacherDto,
  ): Promise<IResponse> {
    return this.teacherService.updateTeacher(+id, createTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse> {
    return this.teacherService.deleteTeacher(+id);
  }
}
