const express = require("express");
const app = express();

//routes
const admin = require("./admin");
const user = require("./user");

app.use(express.json());

app.use("/api/admin", admin)
app.use("/api/user", user)

module.exports = app


