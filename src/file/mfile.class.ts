export class MFile {
  buffer: Buffer;
  mimetype: string;
  cipherName: string;
  originalName: string;

  constructor(file: MFile) {
    this.buffer = file.buffer;
    this.mimetype = file.mimetype;
    this.cipherName = file.cipherName;
    this.originalName = file.originalName;
  }
}
