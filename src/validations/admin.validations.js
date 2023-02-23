const Joi = require("joi");
const validString = Joi.string().required();

const login = (body) => {
    const schema = Joi.object({
        username: validString,
        password: validString,
    });

    return schema.validate(body);
};

module.exports = { login }