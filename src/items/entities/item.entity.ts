import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table
export class Item extends Model {
  @Column({ primaryKey: true })
  id: number;
  @Column
  title: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  public userId: number;

  @BelongsTo(() => User)
  public user: User;
}
