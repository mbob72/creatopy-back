import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true })
  id: number;
  @Column
  login: string;
  @Column
  password: string;
  @Column
  fullName: string;
}
