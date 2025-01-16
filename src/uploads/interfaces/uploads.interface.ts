export interface UploadsInterface {
  upload(file: Array<Express.Multer.File>): Promise<void>;
}
