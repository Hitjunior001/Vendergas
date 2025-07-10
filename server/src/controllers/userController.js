const { User, validate } = require("../models/user");
// const auth = require("../middlewares/auth");

const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body);

        //email
        const existing = await User.findOne({ email: req.body.email });
        if (existing) return res.status(400).send("Email already use.");

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const { _id, name, email } = user;
        res.status(201).send({ _id, name, email });
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
};