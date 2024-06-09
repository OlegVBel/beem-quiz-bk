import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesModule } from './employees/employees.module';
import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { FileModule } from './file/file.module';
import { VideoTestsModule } from './video-tests/video-tests.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { AssignesModule } from './assignes/assignes.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'test',
      // models: [],
      // With that option specified, every model registered through the forFeature() method will be automatically added to the models array of the configuration object.
      // models that aren't registered through the forFeature() method will not be added to the models array.
      autoLoadModels: true,
      synchronize: true,
    }),
    EmployeesModule,
    AuthModule,
    TokenModule,
    FileModule,
    VideoTestsModule,
    QuestionsModule,
    AnswersModule,
    AssignesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
