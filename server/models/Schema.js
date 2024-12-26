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
    PhoneNumber:{
        type:DataTypes.STRING,
        validate: {
            len: [10, 15]
        },
        allowNull:false,
    },
    profileSetup: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
}, {
    timestamps: true
});

module.exports = User;