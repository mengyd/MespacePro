'use strict';
module.exports = (sequelize, DataTypes) => {
    let Department = sequelize.define('Department', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true
    });

    Department.associate = models => {
        Department.hasMany(models.User);
    }
    Department.associate = models => {
        Department.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    }

    return Department;
};