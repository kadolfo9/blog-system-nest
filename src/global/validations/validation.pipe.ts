import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

type Metatype = new (...args: any[]) => object;

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const metatypeObject = metatype as Metatype | undefined;

    if (!metatypeObject || !this.toValidate(metatypeObject)) {
      return value;
    }

    const object = plainToInstance(metatypeObject, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException("Validation failed");
    }
    return value;
  }

  private toValidate(metatype: Metatype): boolean {
    const builtinConstructors = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ] as unknown[];
    return !builtinConstructors.includes(metatype as unknown);
  }
}
