import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './auth.entity';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    @ApiOperation({ summary: '회원가입', description: '새로운 사용자를 등록' })
    @ApiBody({ type: AuthCredentialsDto })
    @ApiResponse({ status: 201, description: '회원가입 성공' })
    @ApiResponse({ status: 409, description: '이미 존재하는 사용자명' })
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authcredentialsDto);
    }

    @Post('/signin')
    @ApiOperation({ summary: '로그인', description: '사용자 인증 및 JWT 토큰 발급' })
    @ApiBody({ type: AuthCredentialsDto })
    @ApiResponse({ 
        status: 201, 
        description: '로그인 성공',
        schema: {
            properties: {
                accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
            }
        }
    })
    @ApiResponse({ status: 401, description: '인증 실패: 잘못된 사용자명 또는 비밀번호' })
    signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authcredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: '인증 테스트', description: '인증된 사용자 정보를 확인' })
    @ApiResponse({ status: 200, description: '인증 성공', type: User })
    @ApiResponse({ status: 401, description: '인증 실패: 유효하지 않은 토큰' })
    test(@GetUser() user: User) {
        console.log('user', user);
        return user;
    }
}
