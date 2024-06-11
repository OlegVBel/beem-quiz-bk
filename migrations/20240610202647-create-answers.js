module.exports = {
  async up(queryInterface, { DataTypes, literal }) {
    await queryInterface.createTable('Answers', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      EmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      QuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Answers: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
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
        allowNull: true,
        type: DataTypes.DATE,
      },
    });

    // Додаємо констрейнти
    await queryInterface.addConstraint('Answers', {
      fields: ['EmployeeId'],
      type: 'foreign key',
      name: 'FK_Answers_EmployeeId',
      references: {
        table: 'Employees',
        field: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Answers', {
      fields: ['QuestionId'],
      type: 'foreign key',
      name: 'FK_Answers_QuestionId',
      references: {
        table: 'Questions',
        field: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Answers');
  },
};
