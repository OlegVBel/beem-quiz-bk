import { Column, Table, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey, AutoIncrement, Sequelize, Model } from 'sequelize-typescript';

@Table({ tableName: 'Files', timestamps: true })
export class File extends Model<File> {
  @PrimaryKey
  @AutoIncrement
  @Column
  Id: number;

  @Column({ allowNull: false })
  CipherName: string;

  @Column({ allowNull: false })
  OriginalName: string;

  @Column({ allowNull: false })
  Url: string;

  @Column({ allowNull: false })
  Mimetype: string;

  @Column({ allowNull: false })
  Size: number;

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
