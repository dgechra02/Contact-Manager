const mongoose = require("mongoose");
//Imports the mongoose library.
// Mongoose is an ODM (Object Data Modeling) library → it makes working with MongoDB easier (schemas, models, queries).
// making a connection with db
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log("err while connecting db");
    process.exit(1);
    // immediately stops the server (exit code 1 means failure).  
  }
};

module.exports = connectDb;
