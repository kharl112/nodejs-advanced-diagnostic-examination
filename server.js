const { sequelize } = require("./dbConnection");
const app = require("./src/routes/app");

require("dotenv").config()
const PORT = process.env.PORT || 5000;

sequelize.authenticate().then(() => {
    console.log("connected to the database");
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    })
}).catch((error) => console.log(error))


