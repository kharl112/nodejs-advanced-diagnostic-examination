const Joi = require("joi");
const validString = Joi.string().required();

const login = (body) => {
    const schema = Joi.object({
        username: validString,
        password: validString,
    });

    return schema.validate(body);
};

const create = (body) => {
    const schema = Joi.object({
        firstName: validString,
        lastName: validString,
        address: validString,
        postCode: validString.min(4).max(6),
        contactPhoneNumber: validString.min(8).max(16),
        email: validString.email(),
        username: validString,
        password: validString.min(8)
    })

    return schema.validate(body);
}


const update = (body) => {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        address: Joi.string(),
        postCode: Joi.string().min(4).max(6),
        contactPhoneNumber: Joi.string().min(8).max(16),
        password: Joi.string().min(8)
    })

    return schema.validate(body);
}


const remove = (body) => {
    const schema = Joi.object({
        ids: Joi.array().items(Joi.string(), Joi.number()).required(),
    })

    return schema.validate(body);
}

module.exports = { login, create, update, remove }