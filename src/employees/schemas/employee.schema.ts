import {
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  AutoIncrement,
  Sequelize,
  Model,
} from 'sequelize-typescript';

@Table({ tableName: 'Employees', timestamps: true })
export class Employee extends Model<Employee> {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({
    allowNull: false,
  })
  FirstName: string;

  @Column({
    allowNull: false,
  })
  LastName: string;

  @CreatedAt
  @Column({
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  CreatedAt: Date;

  @UpdatedAt
  @Column({
    allowNull: true,
  })
  UpdatedAt: Date | null;

  @DeletedAt
  @Column({
    allowNull: true,
  })
  DeletedAt: Date | null;
}
