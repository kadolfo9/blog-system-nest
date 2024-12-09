import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/users.model";
import { UserSignupDto } from "./dto/user-signup.dto";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  public async create(userSignupDto: UserSignupDto): Promise<void> {
    const { username, email, password } = userSignupDto;

    this.userModel
      .create({
        username,
        email,
        password,
      })
      .catch((error) => this.logger.error(error));
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  public async findById(id: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.userModel.destroy({
      where: {
        id,
      },
    });
  }

  public async update(id: number, data: Partial<User>): Promise<void> {
    await this.userModel.update(data, {
      where: {
        id,
      },
    });
  }
}
