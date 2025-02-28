import { Request, Response } from 'express';
import TodoService from '../services/TodoService';

class TodoController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const todo = await TodoService.createTodo(request.body);
            return response.status(201).json(todo);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }

    async index(request: Request, response: Response): Promise<Response> {
        try {
            const todos = await TodoService.getAllTodos();
            return response.json(todos);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async show(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const todo = await TodoService.getTodoById(id);
            return response.json(todo);
        } catch (error) {
            return response.status(404).json({ error: error.message });
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const todo = await TodoService.updateTodo(id, request.body);
            return response.json(todo);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            await TodoService.deleteTodo(id);
            return response.status(204).send();
        } catch (error) {
            return response.status(404).json({ error: error.message });
        }
    }
}

export default new TodoController(); 