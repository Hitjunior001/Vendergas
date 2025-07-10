const { User } = require("../models/user");
const auth = require("../middlewares/auth");
const userController = require('../controllers/userController');


const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home')
})

router.post("/", userController.register)

router.get("/dashboard", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -__v");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

module.exports = router