import { IUser } from 'src/interfaces/user';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsInt, IsString } from 'class-validator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User implements IUser {
  @ApiProperty({ description: 'User identifier', nullable: false })
  @IsString()
  id: string;
  @ApiProperty({ description: 'User login', nullable: false })
  @IsString()
  login: string;
  @ApiProperty({ description: 'User password', nullable: false })
  @IsString()
  @Exclude()
  password: string;
  @ApiProperty({ description: 'User version', nullable: false })
  @IsInt()
  version: number;
  @ApiProperty({
    description: 'Timestamp create User account',
    nullable: false,
  })
  @IsInt()
  createdAt: number;
  @ApiProperty({
    description: 'Timestamp update User account',
    nullable: false,
  })
  @IsInt()
  updatedAt: number;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
