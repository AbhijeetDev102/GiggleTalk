const {DataTypes } = require('sequelize');
const sequelize = require("../config/dbConnect"); // Example for sqlite, change to your database

const User = sequelize.define('User', {
    Firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profileSetup: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = User;