require("dotenv").config({ path: ".env" });
const express = require("express");
const connectDB = require("./connect/connectDB");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const app = express();

//  Connection
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// route users
app.use("/api/v1", require("./route/user-route.js"));

app.use(globalErrorHandler);
app.all("*", (req, res, next) => {
  const err = `Can't find  ${req.originalUrl} on the server`;
  next(err);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
