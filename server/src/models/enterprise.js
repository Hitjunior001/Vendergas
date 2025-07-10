const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const enterpriseSchema = new Schema({
    tradeName: {
        type: String,
        required: true,
    },
    corporateName: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
        unique: true,
    },
    userId: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});


const Enterprise = mongoose.model("Enterprise", enterpriseSchema);


function validateEnterprise(enterprise) {
  const schema = Joi.object({
    tradeName: Joi.string().required(),
    corporateName: Joi.string().required(),
    cnpj: Joi.string().required(),
  });
  return schema.validate(enterprise);
}

module.exports = { Enterprise, validateEnterprise };