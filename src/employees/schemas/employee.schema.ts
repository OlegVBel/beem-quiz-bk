import { Column, Table, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey, AutoIncrement, Sequelize, Model } from 'sequelize-typescript';

@Table({ tableName: 'Employees', timestamps: true })
export class Employee extends Model<Employee> {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ allowNull: true })
  FirstName: string;

  @Column({ allowNull: true })
  LastName: string;

  @Column({ allowNull: false })
  PassHash: string | null;

  @Column({ allowNull: true })
  RefreshToken: string | null;

  @Column({ allowNull: false })
  Email: string;

  @Column({ allowNull: true })
  AvatarUrl: string | null;

  @CreatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') })
  CreatedAt: Date;

  @UpdatedAt
  @Column({ allowNull: true })
  UpdatedAt: Date | null;

  @DeletedAt
  @Column({ allowNull: true })
  DeletedAt: Date | null;
}
