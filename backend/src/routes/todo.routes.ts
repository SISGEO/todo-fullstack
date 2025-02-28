import { Router } from 'express';
import TodoController from '../controllers/TodoController';

const todoRoutes = Router();

todoRoutes.post('/', TodoController.create);
todoRoutes.get('/', TodoController.index);
todoRoutes.get('/:id', TodoController.show);
todoRoutes.put('/:id', TodoController.update);
todoRoutes.delete('/:id', TodoController.delete);

export default todoRoutes; 