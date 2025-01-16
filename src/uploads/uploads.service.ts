import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Uploads } from "./models/uploads.model";

@Injectable({ scope: Scope.REQUEST })
export class UploadsService {
  @InjectModel(Uploads)
  private readonly uploadModel: typeof Uploads;

  @Inject(REQUEST)
  private readonly request: Request;

  public async create(files: Express.Multer.File[]): Promise<void> {
    console.log(files);
    if (!files || files.length === 0) {
      throw new HttpException("No files to upload.", HttpStatus.BAD_REQUEST);
    }
  }
}
