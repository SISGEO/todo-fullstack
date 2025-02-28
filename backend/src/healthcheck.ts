import { Router } from 'express';
import dataSource from './config/database';

const router = Router();

router.get('/health', async (req, res) => {
    try {
        // Verifica se o banco de dados está conectado
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        
        // Tenta fazer uma query simples
        await dataSource.query('SELECT 1');
        
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            database: 'connected'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: error.message || 'Unknown error'
        });
    }
});

export default router; 