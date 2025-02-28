import { DataSource } from 'typeorm';
import { join } from 'path';

const dataSource = new DataSource({
    type: 'sqlite',
    database: join(__dirname, '..', '..', 'database.sqlite'),
    synchronize: true,
    logging: true,
    entities: [join(__dirname, '..', 'models', '*.{ts,js}')],
    migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
});

export default dataSource; 