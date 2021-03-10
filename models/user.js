'use strict';
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['activated', 'paused', 'dimissioned'],
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'manager', 'user'],
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return User;
};