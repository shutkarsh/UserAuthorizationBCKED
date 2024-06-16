const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbconnection");
PORT = process.env.PORT;

connectDb();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactsRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT :  http://localhost:${PORT}`);
});
