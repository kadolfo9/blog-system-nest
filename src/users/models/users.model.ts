import { Column, Default, IsEmail, Model, Table } from "sequelize-typescript";
import { UsersRoles } from "@/users/enums/users.roles";

@Table({
  timestamps: true,
})
export class User extends Model {
  @Column
  username: string;

  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Default(UsersRoles.REGISTERED)
  @Column
  role: UsersRoles;
}
