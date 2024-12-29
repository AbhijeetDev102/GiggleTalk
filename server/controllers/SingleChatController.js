const { where } = require("sequelize");
const User = require("../models/Schema");
const SingleChat = require("../models/SingleChatSchema");
const { Op } = require("sequelize");
const Messsage = require("../models/MessagesSchema");

exports.SingleChat = async (req, res) => {
  try {
    const { groupId, userId, Email } = req.body;
    if (!groupId || !userId || !Email) {
      return res.status(400).json({
        success: false,
        message: "groupId, userId, and Email are required",
      });
    }

    const existingUser = await User.findOne({ where: { userId } });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const user = await User.findOne({ where: { Email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email is not exist",
      });
    }

    const group = await SingleChat.create({
      groupId: groupId,
      userId1: userId,
      userId2: user.userId,
    });

    return res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getGroupinfo = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
      success: false,
      message: "userId is required",
      });
    }

    const existingUser = await User.findOne({ where: { userId } });
    if (!existingUser) {
      return res.status(404).json({
      success: false,
      message: "User not found",
      });
    }

    const data = [];
    const groupData = await SingleChat.findAll({
      where: {
      [Op.or]: [{ userId1: userId }, { userId2: userId }],
      },
      order: [['updatedAt', 'DESC']]
    });

    if (!groupData.length) {
      return res.status(404).json({
      success: false,
      message: "No groups found for this user",
      });
    }

    await Promise.all(
      groupData.map(async (group) => {
      if (group.userId1 == userId) {
        const user = await User.findOne({ where: { userId: group.userId2 } });
        if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
        }

        const userinfo = {
        userId: group.userId2,
        groupDP: user.profilePic,
        groupName: user.Firstname + " " + user.Lastname,
        groupId: group.groupId,
        };
        data.push(userinfo);
      } else {
        const user = await User.findOne({ where: { userId: group.userId1 } });
        if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
        }

        const userinfo = {
        userId: group.userId1,
        groupDP: user.profilePic,
        groupName: user.Firstname + " " + user.Lastname,
        groupId: group.groupId,
        };
        data.push(userinfo);
      }
      })
    );

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.createMessage= async(message)=>{
    try {

      const singleChat = await SingleChat.findOne({where:{groupId:message.groupId}})
    const messageData = {
      senderUserId:message.senderUserId,
      reciverUserId:null,
      groupId:message.groupId,
      content:message.content
    }


    if(message.senderUserId==singleChat.userId1){
      messageData.reciverUserId = singleChat.userId2
    }else{
      messageData.reciverUserId = singleChat.userId1
    }

    const messageCreate = await Messsage.create({
      senderUserId:messageData.senderUserId,
      reciverUserId:messageData.reciverUserId,
      groupId:messageData.groupId,
      content:messageData.content
    })

    console.log(messageCreate);

    return {
      success:true,
      message:"Message created successfully"
    }


    } catch (error) {
      return {
        success:false,
        message :error.message
      }
      
    }
    
}


exports.getPrevPrivateChat = async (req, res)=>{

  try {

    const {groupId} = req.body
    if(!groupId){
      return res.status(400).json({
        success:false,
        message:"groupId is required"
      })
    }
    const messages = await Messsage.findAll({
      where: { groupId },
      order: [['updatedAt', 'ASC']]
    });

    return res.status(200).json({
      success:true,
      data:messages
    })

    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
    
  }


}
