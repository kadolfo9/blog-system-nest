import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  Res,
} from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { AuthRequestDto } from "@/auth/dto/auth-request.dto";
import { Public } from "./decorators/public.decorator";
import { UserSignupDto } from "@/users/models/dto/user-signup.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  @Inject(AuthService) private readonly authService: AuthService;

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  public async auth(
    @Body() authParams: AuthRequestDto,
    @Res() response: Response,
  ): Promise<void> {
    return this.authService.attemptLogin(authParams, response);
  }

  @Public()
  @Post("signup")
  public async signUp(@Body() userSignUpDto: UserSignupDto): Promise<void> {
    return this.authService.signUp(userSignUpDto);
  }

  @Get("profile")
  public async getUser(@Request() request) {
    return this.authService.getUser(request);
  }
}
