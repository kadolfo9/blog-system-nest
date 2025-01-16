import {
  BadRequestException,
  Inject,
  Injectable,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/users/models/users.model";
import { UsersService } from "@/users/users.service";
import { AuthRequestDto } from "@/auth/dto/auth-request.dto";
import {
  compareHash,
  extractTokenFromHeader,
  generateHash,
} from "@/global/helpers";
import { UserSignupDto } from "@/users/models/dto/user-signup.dto";

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

    if (user) {
      const compare = await compareHash(password, user?.password);

      if (!compare) {
        throw new UnauthorizedException(
          "Incorrect Email address or incorrect password.",
        );
      }

      return this.login(user);
    }

    throw new UnauthorizedException("Incorrect Email address or password.");
  }

  async signUp(signUpParams: UserSignupDto): Promise<void> {
    const user = await this.userService.findByEmail(signUpParams.email);

    if (user !== null) {
      throw new BadRequestException("User with this e-mail exists.");
    }

    signUpParams.password = await generateHash(signUpParams.password, 10);

    await this.userService.create(signUpParams);
  }

  public async getUser(@Request() request): Promise<User> {
    const authToken = extractTokenFromHeader(request);

    if (authToken === undefined) {
      throw new UnauthorizedException();
    }

    const currentUser = request?.user;

    if (currentUser === undefined || currentUser?.id === undefined) {
      throw new UnauthorizedException();
    }

    return currentUser;
  }
}
