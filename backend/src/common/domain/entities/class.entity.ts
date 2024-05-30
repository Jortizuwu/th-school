import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { StudentEnity } from './student.entity';
import { TeacherEnity } from './teacher.entity';

@Entity({
  name: 'classes',
})
export class ClassEnity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;

  @ManyToMany(() => StudentEnity, (student) => student.id, {
    cascade: true,
  })
  @JoinTable({
    name: 'class_student',
    joinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  students: StudentEnity[];

  @ManyToOne(() => TeacherEnity, (teacher) => teacher.id)
  teacher: TeacherEnity;
}
