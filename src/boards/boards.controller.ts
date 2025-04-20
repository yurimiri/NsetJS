import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }
    
    @Post()
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBodyById(@Param('id') id: string) {
        return this.boardsService.getBoardById(id)
    }
}
