import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MFile } from './mfile.class';
import { v4 } from 'uuid';
import sharp from 'sharp';
import { join } from 'path';
import { access, mkdir, writeFile } from 'fs/promises';
import { FileResponse } from './response/file-response.dto';

@Injectable()
export class FileService {
  async saveFiles(files: MFile[], folder = 'default') {
    const uploadFolder = join(__dirname, '..', '..', 'static', folder);

    try {
      await access(uploadFolder);
    } catch (e) {
      await mkdir(uploadFolder, { recursive: true });
    }

    return Promise.all(
      files.map(async (file): Promise<FileResponse> => {
        try {
          await writeFile(join(uploadFolder, file.originalname), file.buffer);
        } catch (e) {
          throw new InternalServerErrorException('Error while saving file');
        }

        return {
          url: `/static/${folder}/${file.originalname}`,
          name: file.originalname,
          mimetype: file.mimetype,
          originalname: file.originalname,
          size: file.buffer.byteLength / 1024 / 1024, // in MB
        };
      }),
    );
  }

  convertToWebp(fileBuffer: Buffer): Promise<Buffer> {
    return sharp(fileBuffer).webp().toBuffer();
  }

  async filterFiles(files: MFile[]) {
    return Promise.all(
      files.map(async file => {
        const mimetype = file.mimetype;
        const currentFileType = mimetype.split('/')[1];
        const newName = v4();
        const type = file.originalname.split('.')[1];

        if (mimetype.includes('image')) {
          // eslint-disable-next-line eqeqeq
          if (currentFileType != 'svg+xml') {
            const buffer = await this.convertToWebp(file.buffer);
            return new MFile({
              buffer,
              originalname: `${newName}.webp`,
              mimetype,
            });
          }
          return new MFile({
            buffer: file.buffer,
            originalname: `${newName}.svg`,
            mimetype,
          });
        }

        return new MFile({
          buffer: file.buffer,
          originalname: `${newName}.${type}`,
          mimetype,
        });
      }),
    );
  }
}
