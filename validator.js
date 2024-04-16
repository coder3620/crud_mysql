const Joi = require('joi');

class UserValidator {
    async validate(data, schema) {
        try {
            const { error, value } = await schema.validateAsync(data);
            if (error) {
                throw new Error(error.details[0].message);
            }
            return value;
        } catch (error) {
            throw new Error(`Error validating data: ${error.message}`);
        }
    }

    async validateCreateUser(data) {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            age: Joi.number().integer().min(18).required(),
            phone: Joi.string().pattern(new RegExp('^\\d{10}$')).required(),
        });
        return await this.validate(data, schema);
    }

    async validateUpdateUser(data) {
        const schema = Joi.object({
            user_id: Joi.number().integer().optional(),
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().optional(),
            age: Joi.number().integer().min(18).optional(),
            phone: Joi.string().pattern(new RegExp('^\\d{10}$')).optional(),
            status: Joi.optional(),
        });
        return await this.validate(data, schema);
    }

    async validateDeleteUser(data) {
        const schema = Joi.object({
            user_id: Joi.number().integer().required(),
        });
        return await this.validate(data, schema);
    }
}

module.exports = new UserValidator();
