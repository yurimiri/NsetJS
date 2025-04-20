import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }
        
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board | undefined {
        const found = this.boards.find((board) => board.id === id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        if (found) {
            this.boards = this.boards.filter((board) => board.id !== found.id);
        }
    }

    updateBoardStatus(id: string, status: BoardStatus): Board | undefined {
        const board = this.getBoardById(id);
        
        if (board) {  
            board.status = status;
            return board;
        }
        
        return undefined;
    }
}
