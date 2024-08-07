import { extractTokenFromHeader } from '@/global/helpers';
import { UsersRoles } from '@/users/enums/users.roles';
import { User } from '@/users/models/users.model';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizedUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<UsersRoles[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = request?.user as unknown as User;

    return requiredRoles.some((role) => {
      return user.role === role;
    });
  }
}
