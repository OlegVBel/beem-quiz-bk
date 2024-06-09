module.exports = {
  async up(queryInterface, { DataTypes, literal }) {
    await queryInterface.createTable('Questions', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      VideoTestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Type: {
        type: DataTypes.ENUM('multiple-choice', 'single-choice', 'open-ended', 'note'),
        allowNull: false,
      },
      Question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Variants: {
        type: DataTypes.STRING,
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

    await queryInterface.addConstraint('Questions', {
      fields: ['VideoTestId'],
      type: 'foreign key',
      name: 'FK_Questions_VideoTestId',
      references: {
        table: 'VideoTests',
        field: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Questions');
  },
};
