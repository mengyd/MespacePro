'use strict';

const user_project = require("./user_project");

module.exports = (sequelize, DataTypes) => {
    let Project = sequelize.define('Project', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.STRING,
        },
        endDate: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    });

    Project.associate = models => {
        Project.belongsToMany(models.User, {
            through: models.user_project
        });
    }

    return Project;
};