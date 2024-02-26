const Joi = require('joi');
const validate = require('../validate');

const createTask = (req, res, next) => {
    const create = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().valid('todo', 'started', 'completed').required(),
    });
    validate(create, req.body, res, next);
};

const getTasks = (req, res, next) => {
    const get = Joi.object({
        id: Joi.number().optional(),
        search: Joi.string().optional(),
        status: Joi.string().optional().valid('todo', 'started', 'completed'),
        sortBy: Joi.string().optional().valid('title', 'status', 'createdAt', 'updatedAt'),
        orderBy: Joi.string().optional().valid('asc', 'desc'),
    });
    validate(get, req.query, res, next);
};

const updateTask = (req, res, next) => {
    const update = Joi.object({
        id: Joi.number().required(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        status: Joi.string().valid('todo', 'started', 'completed').optional(),
    });
    validate(update, req.body, res, next);
};

const deleteTask = (req, res, next) => {
    const deleteT = Joi.object({
        id: Joi.number().required(),
    });
    validate(deleteT, req.query, res, next);
};

module.exports = { 
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};