const router = require("express").Router()
const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../../dbConnection");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// models
const Admin = require("../../models/admin")(sequelize, DataTypes);
const User = require("../../models/user")(sequelize, DataTypes);

//validations
const AdminValidation = require("../../validations/admin.validations");
const UserValidation = require("../../validations/user.validations");

// middlewares
const AdminMiddleware = require("../../middlewares/admin.middlewares")

// METHOD POST
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
        res.status(500).send({ message: "can't process request" })
    }
});

router.post("/users/create", AdminMiddleware.auth, async (req, res) => {

    const { error } = UserValidation.create(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const userMeta = req.body;
        const userExists = await User.findOne({ where: { [Op.or]: [{ email: userMeta.email }, { username: userMeta.username }] } });
        if (userExists) return res.status(401).send({ message: 'username or email already exists' });

        const salt = bcrypt.genSaltSync(10);
        await User.create({ ...userMeta, password: bcrypt.hashSync(userMeta.password, salt) });

        res.send({ message: "user registered" });
    } catch (error) {
        res.status(500).send({ message: "can't process request" })
    }
})

router.post("/users/update/:id", AdminMiddleware.auth, async (req, res) => {

    const { error } = UserValidation.update(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    if (!Object.keys(req.body).length) return res.send({ message: "No updated fields" });

    try {
        const { id } = req.params;

        const whereIdClause = { where: { id } }

        const userExists = await User.findOne(whereIdClause);
        if (!userExists) return res.status(401).send({ message: 'user not found' });

        const userMeta = req.body;

        if (userMeta.password) {
            const salt = bcrypt.genSaltSync(10);
            await User.update({ ...userMeta, password: bcrypt.hashSync(userMeta.password, salt) }, whereIdClause);
        } else {
            await User.update(userMeta, whereIdClause);
        }

        res.send({ message: "user updated" });
    } catch (error) {
        res.status(500).send({ message: "can't process request" })
    }
})

router.post("/users/remove", AdminMiddleware.auth, async (req, res) => {

    const { error } = UserValidation.remove(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    if (!req.body.ids.length) return res.send({ message: "No users removed" });

    try {
        const removed = await User.destroy({ where: { id: req.body.ids } });
        res.send({ message: `${removed} user/s removed` });
    } catch (error) {
        res.status(500).send({ message: "can't process request" })
    }
})

router.delete("/users/remove/:id", AdminMiddleware.auth, async (req, res) => {
    const { id } = req.params;

    try {
        const removed = await User.destroy({ where: { id } });
        if (!removed) return res.send({ message: "user not found" });

        res.send({ message: "user removed" });
    } catch (error) {
        res.status(500).send({ message: "can't process request" })
    }
})

// METHOD GET
router.get("/users", AdminMiddleware.auth, async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ["password"] } });
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "can't process request" })
    }
});

router.get("/users/:id", AdminMiddleware.auth, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id }, attributes: { exclude: ["password"] } });
        if (!user) return res.status(404).send({ messag: "user not found" });

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "can't process request" })
    }
})

module.exports = router;