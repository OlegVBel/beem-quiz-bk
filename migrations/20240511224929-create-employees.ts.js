module.exports = {
  async up(queryInterface, { DataTypes, literal }) {
    await queryInterface.createTable('Employees', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AvatarUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PassHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      RefreshToken: {
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Employees');
  },
};
