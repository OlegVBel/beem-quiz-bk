import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './schemas/file.schema';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static'),
      serveRoot: '/static',
    }),
    SequelizeModule.forFeature([File]),
  ],
  exports: [SequelizeModule, FileService],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
