import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(UserRepository)
        private userrepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCreadentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userrepository.createUser(authCreadentialsDto);
    }

    async signIn(authCredentailsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentailsDto;
        const user = await this.userrepository.findOne({ where: { username } });

        if(user && (await bcrypt.compare(password, user.password))) {
            //유저 토큰 생성 ( Secret + Payload )
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}

