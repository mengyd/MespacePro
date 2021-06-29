'use strict';

const user_project = require("./user_project");

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
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        job: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true
    });

    User.associate = models => {
        User.belongsTo(models.Department, {
            foreignKey: {
                allowNull: true
            }
        });

        User.belongsToMany(models.Project, {
            through: models.user_project
        });
    }

    return User;
};