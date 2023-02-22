const router = require("express").Router()


router.get("/profile", (req, res) => {
    res.send({ "message": "user profile" })
});

module.exports = router;