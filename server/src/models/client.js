const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientEmail: {
        type: String,
        required: true,
    },
    clientPhone: {
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


const Client = mongoose.model("Client", clientSchema);


function validateClient(client) {
    const schema = Joi.object({
        clientName: Joi.string().required(),
        clientEmail: Joi.string().required(),
        clientPhone: Joi.string().required(),
    });
    return schema.validate(client);
}

module.exports = { Client, validateClient };