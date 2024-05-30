import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassModule } from './class/class.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_CONFIG } from './common/infrastructure/config/db-config';
import { Module } from '@nestjs/common';
import { LoggerModule } from './common/infrastructure/logger/logger.module';
import { ExceptionsService } from './common/infrastructure/exceptions/exceptions.service';
import { ExceptionsModule } from './common/infrastructure/exceptions/exceptions.module';

@Module({
  imports: [
    DB_CONFIG(),
    StudentModule,
    TeacherModule,
    ClassModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    ExceptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExceptionsService],
})
export class AppModule {}
