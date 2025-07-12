const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productValue: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
        unique: true,
    },
    enterpriseId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enterprise",
        required: true,
    }
});


const Product = mongoose.model("Product", productSchema);


function validateProduct(product) {
    const schema = Joi.object({
        productName: Joi.string().required(),
        productValue: Joi.string().required(),
        productDescription: Joi.string().required(),
    });
    return schema.validate(product);
}

module.exports = { Product, validateProduct };