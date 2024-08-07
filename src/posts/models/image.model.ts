import { Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Image extends Model {}
