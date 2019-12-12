'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Repositories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      license: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      language: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      stargazers: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      forks: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Repositories');
  }
};
