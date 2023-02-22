const router = require("express").Router()

router.post("/login", async (req, res) => {
    try {
    } catch (error) {
        res.status(500).send({ message: JSON.stringify(error) })
    }
});

module.exports = router;