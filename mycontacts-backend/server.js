const express = require("express"); // creating a express server
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();
// calling to connect with db from server
const app = express(); // Express is a function — when called, it creates an app/server instance.
// app for express

const port = process.env.PORT || 5000;
// defining the port

app.use(cors());
// This allows all origins but don’t use it in production — restrict origins there.

app.use(express.json());
// a body parser, parsing the data which is receiving from the client
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);
// app.use are middlewares


app.listen(port, () => {
    console.log(`Server running on the port ${port}`)
})
// listen for the app on the port
