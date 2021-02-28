
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            unique: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
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