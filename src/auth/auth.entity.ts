import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;

    @OneToMany(type => Board, board => board.user, {eager: true})
    @ApiProperty()
    boards: Board[]
}