'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Aptekas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      Ime: {
        type: Sequelize.STRING
      },
      Adresa: {
        type: Sequelize.STRING
      },
      Opstina: {
        type: Sequelize.STRING
      },
      TelBroj: {
        type: Sequelize.INTEGER
      },
      Rating: {
        type: Sequelize.FLOAT
      },
      lat: {
        type: Sequelize.DOUBLE
      },
      lon: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Aptekas');
  }
};