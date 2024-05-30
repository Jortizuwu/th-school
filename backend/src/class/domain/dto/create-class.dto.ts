import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * The CreateClassDto class is a class that defines the properties of a class object.
 *
 * @class CreateClassDto
 * @classdesc CreateClassDto is a class that defines the properties of a class object.
 *
 */

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
