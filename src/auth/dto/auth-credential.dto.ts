import { IsString, Matches, MaxLength, maxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    @ApiProperty()
    password: string;
}