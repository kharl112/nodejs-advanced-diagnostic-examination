const { sequelize } = require("./dbConnection");
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

//routes
const admin = require("./src/routes/admin");
const user = require("./src/routes/user");

app.use(express.json());

app.use("/api/admin", admin)
app.use("/api/user", user)

sequelize.authenticate().then(() => {
    console.log("connected to the database");
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    })
}).catch((error) => console.log(error))