const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
    numberOrder: {
        type: String,
        required: true,
    },
    enterpriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enterprise",
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    observation:
    {
        type: String,
        required: false
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
    const schema = Joi.object({
        numberOrder: Joi.string().required(),
        observation: Joi.string().optional(),
    });
    return schema.validate(order);
}

module.exports = { Order, validateOrder };
