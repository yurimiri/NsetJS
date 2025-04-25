import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;
}