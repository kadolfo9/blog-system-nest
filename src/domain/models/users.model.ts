import { Column, Default, IsEmail, Model, Table } from 'sequelize-typescript';
import { Roles } from '../enums/roles';

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

  @Column
  @Default(Roles.REGISTERED)
  access: Roles;
}
