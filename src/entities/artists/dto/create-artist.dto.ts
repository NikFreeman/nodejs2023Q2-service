import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

export class CreateArtistDto implements ICreateArtistDto {
  @ApiProperty({ description: 'name', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'grammy', nullable: false })
  @IsBoolean()
  grammy: boolean;
}
