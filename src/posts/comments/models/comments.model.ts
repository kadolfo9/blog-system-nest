import { Post } from "@/posts/models/posts.model";
import { User } from "@/users/models/users.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class Comment extends Model {
  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
