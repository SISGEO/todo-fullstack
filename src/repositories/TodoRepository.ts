import { Repository } from 'typeorm';
import dataSource from '../config/database';
import Todo from '../models/Todo';

class TodoRepository {
    private repository: Repository<Todo>;

    constructor() {
        this.repository = dataSource.getRepository(Todo);
    }

    async create(todo: Partial<Todo>): Promise<Todo> {
        const newTodo = this.repository.create(todo);
        return await this.repository.save(newTodo);
    }

    async findAll(): Promise<Todo[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<Todo | null> {
        return await this.repository.findOneBy({ id });
    }

    async update(id: string, todo: Partial<Todo>): Promise<Todo | null> {
        await this.repository.update(id, todo);
        return await this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new TodoRepository(); 