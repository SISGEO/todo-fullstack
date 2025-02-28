import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dataSource from './config/database';
import todoRoutes from './routes/todo.routes';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private async database(): Promise<void> {
        try {
            await dataSource.initialize();
            console.log('Data Source has been initialized!');
        } catch (error) {
            console.error('Error during Data Source initialization:', error);
        }
    }

    private routes(): void {
        this.express.use('/api/todos', todoRoutes);
    }
}

export default new App().express; 