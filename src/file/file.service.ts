import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MFile } from './mfile.class';
import { v4 } from 'uuid';
import * as sharp from 'sharp';
import { join } from 'path';
import { access, mkdir, writeFile } from 'fs/promises';
import { FileResponse } from './response/file-response.dto';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './schemas/file.schema';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File)
    private fileModel: typeof File,
  ) {}

  async uploadFiles(files: MFile[], folder = 'default') {
    const uploadFolder = join(process.cwd(), 'static', folder);

    try {
      await access(uploadFolder);
    } catch (e) {
      await mkdir(uploadFolder, { recursive: true });
    }

    return Promise.all(
      files.map(async (file): Promise<FileResponse> => {
        try {
          await writeFile(join(uploadFolder, file.cipherName), file.buffer);
        } catch (e) {
          throw new InternalServerErrorException('Помилка читання файлу при збереженні');
        }

        return {
          url: `/static/${folder}/${file.cipherName}`,
          cipherName: file.cipherName,
          mimetype: file.mimetype,
          originalName: file.originalName,
          size: file.buffer.byteLength,
        };
      }),
    );
  }

  convertToWebp(fileBuffer: Buffer): Promise<Buffer> {
    return sharp(fileBuffer).webp().toBuffer();
  }

  async filterFiles(files: Express.Multer.File[]) {
    return Promise.all(
      files.map(async file => {
        const mimetype = file.mimetype;
        const currentFileType = mimetype.split('/')[1];
        const newName = v4();
        const splitArray = file.originalname.split('.');
        const type = splitArray[splitArray.length - 1];

        if (mimetype.includes('image')) {
          // eslint-disable-next-line eqeqeq
          if (currentFileType != 'svg+xml') {
            const buffer = await this.convertToWebp(file.buffer);
            return new MFile({
              buffer,
              cipherName: `${newName}.webp`,
              originalName: file.originalname,
              mimetype,
            });
          }
          return new MFile({
            buffer: file.buffer,
            cipherName: `${newName}.svg`,
            originalName: file.originalname,
            mimetype,
          });
        }

        return new MFile({
          buffer: file.buffer,
          cipherName: `${newName}.${type}`,
          originalName: file.originalname,
          mimetype,
        });
      }),
    );
  }

  async saveFiles(files: FileResponse[]) {
    return this.fileModel.bulkCreate(
      files.map(file => ({
        Url: file.url,
        CipherName: file.cipherName,
        Mimetype: file.mimetype,
        OriginalName: file.originalName,
        Size: file.size,
      })),
    );
  }
}
