'use strict';
module.exports = function(sequelize, DataTypes) {
    let user_project = sequelize.define('user_project', {
        userFunction: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });

    return user_project;
};