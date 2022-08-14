import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table
export class Token extends Model {
  @Column
  token: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  public userId: number;

  @BelongsTo(() => User)
  public user: User;
}
