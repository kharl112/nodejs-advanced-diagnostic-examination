const router = require("express").Router()
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../dbConnection");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../../models/user")(sequelize, DataTypes);
const UserValidation = require("../../validations/user.validations");


router.post("/login", async (req, res) => {

    const { error } = UserValidation.login(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(401).send({ message: 'username does not exists' });

        const hash = bcrypt.compareSync(password, user.password);
        if (!hash) return res.status(400).send({ message: "invalid password" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.send({ token })
    } catch (error) {
        res.status(500).send({ message: "can't process request" })
    }
});



module.exports = router;