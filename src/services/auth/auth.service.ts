import {
  BadRequestException,
  Inject,
  Injectable,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/domain/models/users.model';
import { UsersService } from '@/services/users/users.service';
import { AuthRequestDto } from '@/domain/dto/auth/auth-request.dto';
import {
  compareHash,
  extractTokenFromHeader,
  generateHash,
} from '@/core/helpers';
import { UserSignupDto } from '@/domain/dto/users/user-signup.dto';

export interface TokenResponse {
  token: string;
}

@Injectable()
export class AuthService {
  @Inject(UsersService) protected userService: UsersService;
  @Inject(JwtService) protected jwtService: JwtService;

  login(user: User): TokenResponse {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      sub: user.id,
    };

    const jwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      token: jwtToken,
    };
  }

  async attemptLogin(authParams: AuthRequestDto): Promise<TokenResponse> {
    const { email, password } = authParams;

    const user = await this.userService.findByEmail(email);

    if (user == null) {
      throw new UnauthorizedException('Incorrect Email address or password.');
    } else {
      const compare = await compareHash(password, user?.password);
      console.log(compare);

      if (!compare) {
        throw new UnauthorizedException(
          'Incorrect Email address or incorrect password.',
        );
      }

      return this.login(user);
    }
  }

  async signUp(signUpParams: UserSignupDto): Promise<void> {
    const user = this.userService.findByEmail(signUpParams.email);

    if (user) throw new BadRequestException('User with this e-mail exists.');

    signUpParams.password = await generateHash(signUpParams.password, 10);

    await this.userService.create(signUpParams);
  }

  public async getUser(@Request() request): Promise<User> {
    const authToken = extractTokenFromHeader(request);

    if (authToken === undefined) {
      throw new UnauthorizedException();
    }

    console.log(request.user);

    const currentUser = request?.user;

    if (currentUser === undefined || currentUser?.id === undefined) {
      throw new UnauthorizedException();
    }

    return currentUser;
  }
}
