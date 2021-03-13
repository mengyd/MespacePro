'use strict';
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
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
            values: ['super', 'admin', 'user'],
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    User.associate = models => {
        User.belongsTo(models.Department, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return User;
};