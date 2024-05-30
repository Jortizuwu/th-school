import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';

/**
 * The UpdateClassDto class is a partial type of the CreateClassDto class.
 *
 * @class UpdateClassDto
 * @classdesc UpdateClassDto is a partial type of the CreateClassDto class.
 *
 */

export class UpdateClassDto extends PartialType(CreateClassDto) {}
