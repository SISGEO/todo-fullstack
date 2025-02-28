import { DataSource } from 'typeorm';
import { join } from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';
const databaseUrl = process.env.DATABASE_URL;

const dataSource = new DataSource(
    databaseUrl 
    ? {
        type: 'postgres',
        url: databaseUrl,
        synchronize: true,
        logging: isDevelopment,
        ssl: {
            rejectUnauthorized: false
        },
        entities: [join(__dirname, '..', 'models', '*.{ts,js}')],
        migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')]
    }
    : {
        type: 'sqlite',
        database: join(__dirname, '..', '..', 'database.sqlite'),
        synchronize: true,
        logging: isDevelopment,
        entities: [join(__dirname, '..', 'models', '*.{ts,js}')],
        migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')]
    }
);

export default dataSource; 