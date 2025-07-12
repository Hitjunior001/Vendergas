const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
exports.login = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send({ message: "Invalid email or password" });

        const token = user.generateAuthToken();

        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Erro interno no servidor" });
    }
};


const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};