
import express from 'express'
import {getAllTask, createTask, updateTask, getTaskById, deleteTask} from './controllers/TaskController'

const router = express.Router();


router.get('/', getAllTask);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;