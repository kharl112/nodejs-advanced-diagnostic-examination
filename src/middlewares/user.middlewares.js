const jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../dbConnection");
const User = require("../../models/user")(sequelize, DataTypes);
require("dotenv").config();

const auth = async (req, res, next) => {

    const token = req.header("Authorization");
    if (!token) return res.status(401).send({ message: "access denied" });

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id }, attributes: { exclude: ["password"] } });

        if (!user) return res.status(400).send({ message: "account not found" });
        req.locals = user;
        next();
    } catch (error) {
        return res.status(400).send({ message: "invalid session token" });
    }
};

module.exports = { auth };