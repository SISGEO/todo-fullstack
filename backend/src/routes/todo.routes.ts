import { Router } from 'express';
import TodoController from '../controllers/TodoController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Todas as rotas de todo precisam de autenticação
router.use(authMiddleware);

router.get('/', TodoController.index);
router.post('/', TodoController.create);
router.get('/:id', TodoController.show);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

export default router; 