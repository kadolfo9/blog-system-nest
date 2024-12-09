import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "@/users/models/users.model";

@Table({
  timestamps: true,
})
export class Post extends Model {
  @Column
  title: string;

  @Column(DataType.TEXT)
  content: string;

  // @Column
  // attachments: Array<any>;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
