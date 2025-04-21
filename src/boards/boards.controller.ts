import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }
    
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Get('/:id')
    getBoardByID(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBodyById(@Param('id') id: string) {
    //     return this.boardsService.getBoardById(id)
    // }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string){
    //     this.boardsService.deleteBoard(id);
    // }

    
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', BoardStatusValidationPipe) status: BoardStatus    
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string, 
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus    
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
