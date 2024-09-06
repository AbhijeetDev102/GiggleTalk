const mongoose = require("mongoose")

require("dotenv").config()
const URL=process.env.DB_URL
const dbConnect = ()=>{
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{
        console.log("Database is connected successfully");
        
    })
    .catch((err)=>{
        console.log(err);
        process.exit()
    })
}


module.exports = dbConnect;