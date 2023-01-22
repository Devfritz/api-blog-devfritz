const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection database successfully " + db.connection.host);
  } catch (error) {
    console.log(`Error Connection ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
