import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/schemas/user.schema';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: UserRole;
        };
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: UserRole;
        };
        access_token: string;
    }>;
    getProfile(userId: string): Promise<import("../users/schemas/user.schema").UserDocument>;
}
