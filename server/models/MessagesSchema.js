const {DataTypes} = require("sequelize")

const sequelize = require("../config/dbConnect")
const Messsage = sequelize.define( "Message",{

    senderUserId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    reciverUserId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
    groupId:{
        type:DataTypes.STRING,
        allowNull:false
    },

},{
    timestamps:true
})

module.exports = Messsage
