"use strict";

module.exports = function (sequelize, Sequelize) {
    return sequelize.define("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        // validate: {
        //     is: /^[0-9a-f]{64}$/i
        //   }
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.INTEGER,
        // defaultValue: Sequelize.fn('NOW'),
        allowNull: false
      },
      updated_at: {
        type: Sequelize.INTEGER,
        // defaultValue: Sequelize.fn('NOW'),
        allowNull: false
      }
    }, {
      createdAt: "created_at",
      updatedAt: "updated_at"
        });
};