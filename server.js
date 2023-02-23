const { sequelize } = require("./dbConnection");
const express = require("express");
const app = require("./src/routes/app");

require("dotenv").config()
const PORT = process.env.PORT || 5000;

const path = require("path");

app.use(express.static("views"));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

sequelize.authenticate().then(() => {
    console.log("connected to the database");
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    })
}).catch((error) => console.log(error))


