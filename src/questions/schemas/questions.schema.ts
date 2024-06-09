import { Column, Table, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey, AutoIncrement, Sequelize, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { VideoTest } from '../../video-tests/schemas/video-tests.schema';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  SINGLE_CHOICE = 'single-choice',
  OPEN_ENDED = 'open-ended',
  NOTE = 'note',
}

@Table({ tableName: 'Questions', timestamps: true })
export class Question extends Model<Question> {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @ForeignKey(() => VideoTest)
  @Column({ allowNull: false })
  VideoTestId: number;

  @BelongsTo(() => VideoTest, 'VideoTestId')
  VideoTest: VideoTest;

  @Column({ allowNull: false })
  Time: number;

  @Column({ allowNull: false })
  Type: QuestionType;

  @Column({ allowNull: false })
  Question: string;

  @Column({ allowNull: true })
  Variants: string;

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
