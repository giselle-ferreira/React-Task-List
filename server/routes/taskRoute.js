const { Router } = require('express');
const router = Router();
const TaskController = require('../controllers/TaskController')

router.get('/tasks', TaskController.getAllTasks)
router.post('/tasks/create', TaskController.createTask);
router.put('/tasks/edit', TaskController.editTask);
router.put('/tasks/status', TaskController.updateStatus);
router.delete('/tasks/delete/:id', TaskController.deleteTask);


module.exports = router;


