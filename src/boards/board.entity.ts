import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/auth.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id:number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    status: BoardStatus;

    @ManyToOne(type => User, user => user.boards, {eager: false})
    @ApiProperty()
    user: User;
}