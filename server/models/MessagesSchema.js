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
    deleteFromUserId:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    deleteFromEveryOne:{
        type:DataTypes.BOOLEAN,
        allowNull:true
        
    }

},{
    timestamps:true
})

module.exports = Messsage
