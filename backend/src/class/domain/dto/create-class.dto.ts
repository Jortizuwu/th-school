import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class AddStudentsToClassDto {
  @IsNotEmpty({
    message: 'studentsId is required',
  })
  @IsArray({
    message: 'studentsId must be an array',
  })
  studentsId: number[];
}

export class AddTeacherToClassDto {
  @IsNotEmpty()
  @IsNumber()
  teacherId: number;
}
