const mongoose = require("mongoose");
const Joi = require("joi");

const orderProductSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const OrderProduct = mongoose.model("OrderProduct", orderProductSchema);

function validateOrderProduct(orderProduct) {
    const schema = Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
    });
    return schema.validate(orderProduct);
}

module.exports = { OrderProduct, validateOrderProduct };
