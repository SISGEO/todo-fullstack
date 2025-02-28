import { DataSource } from 'typeorm';
import { join } from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

const dataSource = new DataSource({
    type: 'sqlite',
    database: isDevelopment 
        ? join(__dirname, '..', '..', 'database.sqlite')
        : ':memory:', // Use in-memory database for production
    synchronize: true,
    logging: isDevelopment,
    entities: [join(__dirname, '..', 'models', '*.{ts,js}')],
    migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
});

export default dataSource; 