import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/auth.entity';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('boards')
@UseGuards(AuthGuard())
@ApiTags('Boards')
@ApiBearerAuth('access-token')
export class BoardsController {
    private logger = new Logger('Boards');
    constructor(private boardsService: BoardsService) {}

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }
    @Get('/')
    @ApiOperation({ summary: '모든 게시글 조회', description: '로그인한 사용자의 모든 게시글을 조회 (JWT 토큰 필요)' })
    @ApiResponse({ status: 200, description: '게시글 목록 조회 성공', type: [Board] })
    @ApiResponse({ status: 401, description: '인증 실패: 유효하지 않은 토큰' })
    getAllBoard(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }
    
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }
    @Post()
    @ApiBody({ type: [User] })
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '게시글 생성', description: '새로운 게시글을 생성 (JWT 토큰 필요)' })
    @ApiBody({ type: CreateBoardDto })
    @ApiResponse({ status: 201, description: '게시글 생성 성공', type: Board })
    @ApiResponse({ status: 401, description: '인증 실패: 유효하지 않은 토큰' })
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User
    ): Promise<Board> {
        this.logger.verbose(`User ${user.username} create a new board. 
        Payload: ${JSON.stringify(createBoardDto)}`);
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Get('/:id')
    @ApiOperation({ summary: '게시글 상세 조회', description: 'ID로 특정 게시글을 조회 (JWT 토큰 필요)' })
    @ApiParam({ name: 'id', description: '게시글 ID' })
    @ApiResponse({ status: 200, description: '게시글 조회 성공', type: Board })
    @ApiResponse({ status: 401, description: '인증 실패: 유효하지 않은 토큰' })
    @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
    getBoardByID(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBodyById(@Param('id') id: string) {
    //     return this.boardsService.getBoardById(id)
    // }

    @Delete('/:id')
    @ApiOperation({ summary: '게시글 삭제', description: 'ID로 게시글을 삭제 (JWT 토큰 필요, 자신의 게시글만 삭제 가능)' })
    @ApiParam({ name: 'id', description: '게시글 ID' })
    @ApiResponse({ status: 200, description: '게시글 삭제 성공' })
    @ApiResponse({ status: 401, description: '인증 실패: 유효하지 않은 토큰' })
    @ApiResponse({ status: 403, description: '권한 없음: 자신의 게시글만 삭제 가능' })
    @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string){
    //     this.boardsService.deleteBoard(id);
    // }

    
    @Patch('/:id/status')
    @ApiOperation({ summary: '게시글 상태 변경', description: '게시글의 상태를 변경 (JWT 토큰 필요)' })
    @ApiParam({ name: 'id', description: '게시글 ID' })
    @ApiBody({ schema: { properties: { status: { type: 'string', enum: ['PUBLIC', 'PRIVATE'] } } } })
    @ApiResponse({ status: 200, description: '게시글 상태 변경 성공', type: Board })
    @ApiResponse({ status: 401, description: '인증 실패: 유효하지 않은 토큰' })
    @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', BoardStatusValidationPipe) status: BoardStatus    
    ): Promise<Board> {
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
