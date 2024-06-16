const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://malharmehta7:Malhar3012002@cluster1.amivt4d.mongodb.net/userslogin",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
      }
    );
    // console.log(MongoDB connected: ${conn.connection.host});
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;