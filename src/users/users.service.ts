import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { UserSignupDto } from './dto/user-signup.dto';

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
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException();

    console.log(user);

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
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
