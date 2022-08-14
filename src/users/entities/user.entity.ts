import { Table, Column, Model } from 'sequelize-typescript';
import { INTEGER } from 'sequelize';

@Table
export class User extends Model {
  @Column({ primaryKey: true, type: INTEGER })
  id: number;
  @Column({ unique: true })
  login: string;
  @Column
  fullName: string;
}
