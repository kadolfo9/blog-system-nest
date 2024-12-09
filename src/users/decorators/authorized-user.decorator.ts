import { SetMetadata } from "@nestjs/common";
import { UsersRoles } from "@/users/enums/users.roles";

const IS_AUTHORIZED_USER_ROLES = "authorized_user_roles";
export const AuthorizedUser = (...roles: UsersRoles[]) =>
  SetMetadata(IS_AUTHORIZED_USER_ROLES, roles);
