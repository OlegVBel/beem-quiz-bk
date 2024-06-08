module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.addColumn('Employees', 'Notes', {
      type: DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Employees', 'AvatarId', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });

    await queryInterface.addConstraint('Employees', {
      fields: ['AvatarId'],
      type: 'foreign key',
      name: 'FK_Employees_AvatarId',
      references: {
        table: 'Files',
        field: 'Id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.removeColumn('Employees', 'AvatarUrl');
  },

  async down() {
    // not implemented
  },
};
