import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(UserRepository)
        private userrepository: UserRepository
    ) {}

    async signUp(authCreadentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userrepository.createUser(authCreadentialsDto);
    }

    async signIn(authCredentailsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentailsDto;
        const user = await this.userrepository.findOne({ where: { username } });

        if(user && (await bcrypt.compare(password, user.password))) {
            return 'login success';
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}

