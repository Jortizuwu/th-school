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

/*
The AppModule class is a NestJS module that defines the configuration for the application. It is decorated with the @Module decorator, which indicates that it is a module in the NestJS application.

The imports array specifies the modules that this module depends on. It includes the DB_CONFIG module, StudentModule, TeacherModule, ClassModule, ConfigModule, LoggerModule, and ExceptionsModule. These modules provide different functionalities and services to the application.

The controllers array specifies the controllers that are included in this module. In this case, it includes the AppController. Controllers handle incoming requests and define the application's routes.

The providers array specifies the providers (services) that are included in this module. In this case, it includes the AppService and ExceptionsService. Providers are responsible for implementing the business logic and handling the application's data.

Overall, the AppModule class sets up the application's modules, controllers, and providers, and configures the application's dependencies.

Here is a succinct explanation of each class method:

The @Module decorator is used to define a module.
*/
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
