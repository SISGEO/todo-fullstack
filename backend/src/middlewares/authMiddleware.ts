import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import dataSource from '../config/database';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const secret = process.env.JWT_SECRET || 'default_secret';
        const decoded = jwt.verify(token, secret) as TokenPayload;

        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: decoded.id } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = {
            id: user.id
        };

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
} 