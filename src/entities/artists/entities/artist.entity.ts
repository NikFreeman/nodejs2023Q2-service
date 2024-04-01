import { IArtist } from 'src/interfaces/artist';
import { IsString, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Artist implements IArtist {
  @ApiProperty({
    description: 'Artist identifier',
    format: 'uuid',
  })
  @IsUUID(4)
  id: string;
  @ApiProperty({ description: 'Artist name', example: 'Test user' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'Grammy', example: 'false' })
  @IsBoolean()
  grammy: boolean;

  constructor(partial: Partial<IArtist>) {
    Object.assign(this, partial);
  }
}
