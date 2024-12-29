const { DataTypes } = require("sequelize")
const sequelize = require("../config/dbConnect")

const SingleChat = sequelize.define("SingleChat", {
    groupId:{
       type:DataTypes.STRING,
       allowNull:false
    },
    userId1:{
       type:DataTypes.INTEGER,
       allowNull:false
    },
    userId2:{
       type:DataTypes.INTEGER,
       allowNull:false
    },
},{timestamp:true})


module.exports = SingleChat