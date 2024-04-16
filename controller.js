const UserHelper = require('./helper');
const response = require('./response');
const userValidator = require('./validator');

class UserController {
    async createUser(req, res) {
        try {
            await userValidator.validateCreateUser(req.body);
            const result = await UserHelper.createUser(req.body);
            response.sendSuccess(res, result);
        } catch (error) {
            response.sendError(res, error);
        }
    }

    async loginUser(req, res) {
        try {
            // const validatedData = await userValidator.validateLogin(req.body);
            const token = await UserHelper.loginUser(req.body);
            response.sendSuccess(res, { token: token });
        } catch (error) {
            response.sendError(res, error);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserHelper.getAllUsers();
            response.sendSuccess(res, users);
        } catch (error) {
            response.sendError(res, error);
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserHelper.getUserById(req.query);
            response.sendSuccess(res, user);
        } catch (error) {
            response.sendError(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            await userValidator.validateUpdateUser(req.body);
            const updatedUser = await UserHelper.updateUser(req.body);
            response.sendSuccess(res, updatedUser);
        } catch (error) {
            response.sendError(res, error);
        }
    }

    async deleteUser(req, res) {
        try {
            await userValidator.validateDeleteUser(req.query);
            await UserHelper.deleteUser(req.query);
            response.sendSuccess(res, { message: 'User deleted successfully' });
        } catch (error) {
            response.sendError(res, error);
        }
    }
}

module.exports = new UserController();
