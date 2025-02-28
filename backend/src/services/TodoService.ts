import Todo from '../models/Todo';
import TodoRepository from '../repositories/TodoRepository';

class TodoService {
    async createTodo(todoData: Partial<Todo>): Promise<Todo> {
        if (!todoData.title) {
            throw new Error('Title is required');
        }
        return await TodoRepository.create(todoData);
    }

    async getAllTodos(): Promise<Todo[]> {
        return await TodoRepository.findAll();
    }

    async getTodoById(id: string): Promise<Todo> {
        const todo = await TodoRepository.findById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        return todo;
    }

    async updateTodo(id: string, todoData: Partial<Todo>): Promise<Todo> {
        const todo = await TodoRepository.findById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        const updatedTodo = await TodoRepository.update(id, todoData);
        if (!updatedTodo) {
            throw new Error('Failed to update todo');
        }
        return updatedTodo;
    }

    async deleteTodo(id: string): Promise<void> {
        const todo = await TodoRepository.findById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        await TodoRepository.delete(id);
    }
}

export default new TodoService(); 