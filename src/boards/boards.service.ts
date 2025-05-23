import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/auth.entity';

@Injectable()
export class BoardsService {
    constructor(private boardRepository: BoardRepository) {}

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    async getAllBoards(
        user: User
    ): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();

        return boards;
    }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;

    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
        
    //     this.boards.push(board);
    //     return board;
    // }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne({ where: { id } });

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // getBoardById(id: string): Board | undefined {
    //     const found = this.boards.find((board) => board.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }

    //     return found
    // }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({id, user});

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     if (found) {
    //         this.boards = this.boards.filter((board) => board.id !== found.id);
    //     }
    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
    // updateBoardStatus(id: string, status: BoardStatus): Board | undefined {
    //     const board = this.getBoardById(id);
        
    //     if (board) {  
    //         board.status = status;
    //         return board;
    //     }
        
    //     return undefined;
    // }
}
