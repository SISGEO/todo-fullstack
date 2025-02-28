import { User } from '../models/User';
import dataSource from '../config/database';
import jwt from 'jsonwebtoken';

type UserWithoutPassword = Omit<User, 'password' | 'hashPassword' | 'checkPassword'>;

interface IAuthResponse {
    user: UserWithoutPassword;
    token: string;
}

class AuthService {
    private userRepository = dataSource.getRepository(User);

    async register(name: string, email: string, password: string): Promise<IAuthResponse> {
        const userExists = await this.userRepository.findOne({ where: { email } });
        
        if (userExists) {
            throw new Error('User already exists');
        }

        const user = this.userRepository.create({
            name,
            email,
            password
        });

        await this.userRepository.save(user);

        const { password: _, hashPassword: __, checkPassword: ___, ...userWithoutPassword } = user;
        
        return {
            user: userWithoutPassword,
            token: this.generateToken(user.id)
        };
    }

    async login(email: string, password: string): Promise<IAuthResponse> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const validPassword = await user.checkPassword(password);

        if (!validPassword) {
            throw new Error('Invalid credentials');
        }

        const { password: _, hashPassword: __, checkPassword: ___, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token: this.generateToken(user.id)
        };
    }

    private generateToken(userId: string): string {
        const secret = process.env.JWT_SECRET || 'default_secret';
        return jwt.sign({ id: userId }, secret, { expiresIn: '1d' });
    }
}

export default new AuthService(); 