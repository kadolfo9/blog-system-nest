import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "@/users/models/users.model";
import { Comment } from "@/posts/comments/models/comments.model";
// import { Uploads } from "@/uploads/models/uploads.model";

@Table({
  timestamps: true,
})
export class Post extends Model {
  @Column
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments?: Comment[];

  // @HasMany(() => Uploads)
  // attachments?: Uploads[];
}
