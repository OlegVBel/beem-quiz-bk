import { Column, Table, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey, AutoIncrement, Sequelize, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from '../../employees/schemas/employee.schema';
import { VideoTest } from '../../video-tests/schemas/video-test.schema';

@Table({ tableName: 'Assignes', timestamps: true })
export class Assignes extends Model<Assignes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @ForeignKey(() => Employee)
  @Column({ allowNull: false })
  EmployeeId: number;

  @BelongsTo(() => Employee, 'EmployeeId')
  Employee: Employee;

  @ForeignKey(() => VideoTest)
  @Column({ allowNull: false })
  VideoTestId: number;

  @BelongsTo(() => VideoTest, 'VideoTestId')
  VideoTest: VideoTest;

  @Column({ allowNull: false, defaultValue: false })
  IsPassed: boolean;

  @Column({ allowNull: false, defaultValue: false })
  IsRead: boolean;

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
