module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Assignes', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      EmployeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      VideoTestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      IsPassed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      IsRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      UpdatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      DeletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    // Додаємо констрейни
    await queryInterface.addConstraint('Assignes', {
      fields: ['EmployeeId'],
      type: 'foreign key',
      name: 'FK_Assignes_EmployeeId',
      references: {
        table: 'Employees',
        field: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Assignes', {
      fields: ['VideoTestId'],
      type: 'foreign key',
      name: 'FK_Assignes_VideoTestId',
      references: {
        table: 'VideoTests',
        field: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Assignes');
  },
};
