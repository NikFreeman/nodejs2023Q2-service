import { IUser } from 'src/interfaces/user';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsInt, IsString, IsUUID } from 'class-validator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class User implements IUser {
  @ApiProperty({
    description: 'User identifier',
    format: 'uuid',
  })
  @IsUUID(4)
  id: string;
  @ApiProperty({ description: 'User login', example: 'Test user' })
  @IsString()
  login: string;
  @ApiHideProperty()
  @IsString()
  @Exclude()
  password: string;
  @ApiProperty({ description: 'User version', required: false, example: '1' })
  @IsInt()
  version: number;
  @ApiProperty({
    description: 'Timestamp create User account',
    required: false,
    example: '1655000000',
  })
  @IsInt()
  createdAt: number;
  @ApiProperty({
    description: 'Timestamp update User account',
    required: false,
    example: '1655000000',
  })
  @IsInt()
  updatedAt: number;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
