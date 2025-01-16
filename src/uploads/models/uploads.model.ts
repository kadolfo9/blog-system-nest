import { Column, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class Uploads extends Model {
  @Column
  upload_url: string;
}
