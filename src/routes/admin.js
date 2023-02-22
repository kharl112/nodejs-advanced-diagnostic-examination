const router = require("express").Router()
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../dbConnection");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const Admin = require("../../models/admin")(sequelize, DataTypes);

const AdminValidation = require("../../validations/admin.validations");

const AdminMiddleware = require("../../middlewares/admin.middlewares")

router.post("/login", async (req, res) => {

    const { error } = AdminValidation.login(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ where: { username } });
        if (!admin) return res.status(401).send({ message: 'username does not exists' });

        const hash = bcrypt.compareSync(password, admin.password);
        if (!hash) return res.status(400).send({ message: "invalid password" });

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.send({ token })
    } catch (error) {
        res.status(500).send({ message: JSON.stringify(error) })
    }
});

router.get("/users", AdminMiddleware.auth, async (req, res) => {
    res.send({ message: "success" })
})

module.exports = router;