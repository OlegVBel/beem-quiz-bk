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
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { File } from '../../file/schemas/file.schema';
import { Employee } from '../../employees/schemas/employee.schema';
import { Question } from '../../questions/schemas/question.schema';

@Table({ tableName: 'VideoTests', timestamps: true })
export class VideoTest extends Model<VideoTest> {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ allowNull: true })
  Name: string;

  @Column({ allowNull: true })
  Description: string;

  @Column({ allowNull: true })
  Options: string;

  @ForeignKey(() => Employee)
  @Column({ allowNull: false })
  EmployeeId: number;

  @BelongsTo(() => Employee, 'EmployeeId')
  Employee: Employee;

  @ForeignKey(() => File)
  @Column({ allowNull: true })
  VideoId: number;

  @BelongsTo(() => File, 'VideoId')
  Video: File;

  @ForeignKey(() => File)
  @Column({ allowNull: true })
  PreviewId: number;

  @BelongsTo(() => File, 'PreviewId')
  Preview: File;

  @HasMany(() => Question, 'VideoTestId')
  Questions: Question[];

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
