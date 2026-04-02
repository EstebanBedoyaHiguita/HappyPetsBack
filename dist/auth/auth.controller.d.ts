import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
        };
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
        };
        access_token: string;
    }>;
    getProfile(req: {
        user: {
            id: string;
        };
    }): Promise<import("../users/schemas/user.schema").UserDocument>;
}
