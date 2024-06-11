import { Column, Table, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey, AutoIncrement, Sequelize, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Employee } from '../../employees/schemas/employee.schema';
import { Question } from '../../questions/schemas/question.schema';

@Table({ tableName: 'Answers', timestamps: true })
export class Answer extends Model<Answer> {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @ForeignKey(() => Employee)
  @Column({ allowNull: false })
  EmployeeId: number;

  @BelongsTo(() => Employee, 'EmployeeId')
  Employee: Employee;

  @ForeignKey(() => Question)
  @Column({ allowNull: false })
  QuestionId: number;

  @BelongsTo(() => Question, 'QuestionId')
  Question: Question;

  @Column({ allowNull: false })
  Answers: string;

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
