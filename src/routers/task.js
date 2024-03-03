const router = require('express').Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../middleware/joi/task');
const { Task } = require('../db/sequalize');
const { isObjectEmpty } = require('../utils');
const { Op } = require('sequelize');

router.post('/', createTask, async (req, res) => {
    try {
        const task = await Task.create(req.body);
        return res.status(201).json(task);
    } catch (error) {
        console.log('Error in create task: ', error);
        return res.status(400).json({ error: error.message });
    }
});

router.get('/', getTasks, async (req, res) => {
    try {
        const filters = req.query;
        if (isObjectEmpty(filters)) {
            const tasks = await Task.findAll();
            return res.status(200).json(tasks);
        }
        else if (filters.id) {
            const task = await Task.findOne({
                where: {
                    id: filters.id,
                },
            });
            return res.status(200).json(task);
        }
        else {
            const condition = [];
            let order = [['id', 'ASC']];
            if (filters.search) {
                condition.push({ title: { [Op.iLike]: `${filters.search}%` } });
            }
            if (filters.status) {
                condition.push({ status: filters.status });
            }
            if (filters.sortBy) {
                order = [[filters.sortBy, filters.orderBy || 'ASC']];
            }

            const tasks = await Task.findAll({
                where: { [Op.and]: condition },
                order,
            })

            return res.status(200).json(tasks);
        }
    } catch (error) {
        console.log('Error in get tasks: ', error);
        return res.status(400).json({ error: error.message });
    }
});

router.put('/', updateTask, async (req, res) => {
    try {
        const { body } = req;
        const taskId = body.id;
        delete body.id;

        const task = await Task.findByPk(taskId);
        if (isObjectEmpty(task)) {
            throw new Error(`Task not found with id: ${taskId}`);
        }

        const updatedTask = await task.update(body);
        return res.status(200).json(updatedTask);
    } catch (error) {
        console.log('Error in updating task: ', error);
        return res.status(400).json({ error: error.message });
    }
});

router.delete('/', deleteTask, async (req, res) => {
    try {
        const { id } = req.query;
        console.log({id})
        await Task.destroy({
            where: { id: id },
        });
        return res.status(200).json({ success: 'success' });
    } catch (error) {
        console.log('Error in deleting task: ', error);
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;