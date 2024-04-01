import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

interface ICreateUserDto {
  login: string;
  password: string;
}
export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({ description: 'The User`s login', nullable: false })
  @IsString()
  login: string;
  @ApiProperty({ description: 'The User`s password', nullable: false })
  @IsString()
  password: string;
}
