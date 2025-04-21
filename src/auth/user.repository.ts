import { DataSource, Repository } from "typeorm";
import { User } from "./auth.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'; 

// @EntityRepository(User)
@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentailsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentailsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create( { username, password: hashedPassword });

        try {
            await this.save(user);
        }
        catch(error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException()
            }
        }
       
    }
}