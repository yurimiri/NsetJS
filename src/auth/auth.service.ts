import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(UserRepository)
        private userrepository: UserRepository
    ) {}

    async signUp(authCreadentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userrepository.createUser(authCreadentialsDto);
    }
}

