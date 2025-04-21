import { DataSource, Repository } from "typeorm";
import { User } from "./auth.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { Injectable } from "@nestjs/common";

// @EntityRepository(User)
@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentailsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentailsDto;
        const user = this.create( {username, password });

        await this.save(user);
    }
}