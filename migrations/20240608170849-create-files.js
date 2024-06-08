module.exports = {
  async up(queryInterface, { DataTypes, literal }) {
    await queryInterface.createTable('Files', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      CipherName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OriginalName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Size: {
        type: DataTypes.BIGINT,
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
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Files');
  },
};
