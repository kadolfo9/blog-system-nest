import {
  Controller,
  FileTypeValidator,
  Inject,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadsService } from "./uploads.service";
import { PostManagementGuard } from "@/posts/guards/post-manage.guard";

@Controller("posts/uploads")
export class UploadsController {
  @Inject(UploadsService)
  private readonly uploadsService: UploadsService;

  @Post("/:postId/create")
  @UseInterceptors(FilesInterceptor("files"))
  @UseGuards(PostManagementGuard)
  public async create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: new RegExp("^image/(jpeg|png|gif|bmp|webp|tiff|svg)$"),
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<void> {
    return this.uploadsService.create(files);
  }
}
