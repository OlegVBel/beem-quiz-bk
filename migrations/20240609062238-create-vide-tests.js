module.exports = {
  async up(queryInterface, { DataTypes, literal }) {
    await queryInterface.createTable('VideoTests', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Description: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },
      Options: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },
      EmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      VideoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      PreviewId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CreatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      UpdatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      DeletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('VideoTests', {
      fields: ['EmployeeId'],
      type: 'foreign key',
      name: 'FK_VideoTests_EmployeeId',
      references: {
        table: 'Employees',
        field: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('VideoTests', {
      fields: ['VideoId'],
      type: 'foreign key',
      name: 'FK_VideoTests_VideoId',
      references: {
        table: 'Files',
        field: 'Id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('VideoTests', {
      fields: ['PreviewId'],
      type: 'foreign key',
      name: 'FK_VideoTests_PreviewId',
      references: {
        table: 'Files',
        field: 'Id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('VideoTests');
  },
};
