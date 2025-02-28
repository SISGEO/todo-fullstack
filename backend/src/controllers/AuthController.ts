import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
    async register(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const result = await AuthService.register(name, email, password);
            return res.status(201).json(result);
        } catch (error: any) {
            if (error.message === 'User already exists') {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const result = await AuthService.login(email, password);
            return res.status(200).json(result);
        } catch (error: any) {
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AuthController(); 