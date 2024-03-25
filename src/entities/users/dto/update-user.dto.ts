import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdateUserDto implements IUpdatePasswordDto {
  @ApiProperty({ description: 'The User`s old password', nullable: false })
  @IsString()
  oldPassword: string;
  @ApiProperty({ description: 'The User`s new password', nullable: false })
  @IsString()
  newPassword: string;
}
