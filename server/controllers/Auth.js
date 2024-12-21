const User = require("../models/Schema");
const { where } = require("sequelize")
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")
exports.Signup = async (req, res) => {
    
        const { Firstname, Lastname, Email, Password, ConfirmPassword } = req.body;

        const UserExist = await User.findOne({ where:{Email} })
        if (UserExist){
            return res.json({
                success:false,
                message:"User already exist please login "
            })
        }


        // Check if passwords match
        if (Password !== ConfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt rounds

        // Create the user with hashed password
        const profileSetup = true
        const userdata = await User.create({
            Firstname,
            Lastname,
            Email,
            Password: hashedPassword, // Save hashed password
            profileSetup:profileSetup
        });


        const payload = {Firstname,Lastname, Email, profileSetup}

        const token = jwt.sign(payload, process.env.JWT_SECRETE)
        console.log(token);

        // res.cookie("token",token)
        

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data:{
                Email:userdata.Email,
                Firstname:userdata.Firstname,
                Lastname:userdata.Lastname,
                profileSetup:userdata.profileSetup,
                token:token
            }
        });
    
};


exports.Login = async (req, res)=>{
    try {
        const {Email, Password} = req.body;

        const UserExist = await User.findOne({where: {Email}})
        if (!UserExist){
            return res.json({
                success:false,
                message:"User doesn't exist please signup first "
            })
        }

        const isPassCorrect = await bcrypt.compare(Password, UserExist.Password )

        if(!isPassCorrect){
            return res.json({
                success:false,
                message:"Password is incorrect"
            })
        }

        

        return res.status(200).json({
            success:true,
            meesage:"User logedin",
            // token :token
            data:{
                Email:UserExist.Email,
                Firstname:UserExist.Firstname,
                Lastname:UserExist.Lastname,
                profileSetup:UserExist.profileSetup
            }
        })
        
    } catch (error) {
        return res.json({
            success :false,
            message :error.message
        })
        
    }
}