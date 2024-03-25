import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { IFavorites } from 'src/interfaces/favorite';

export class Favorite implements IFavorites {
  @ApiProperty({
    description: 'Artist id favorites',
    format: '[uuid]',
  })
  @IsArray()
  artists: string[];
  @IsArray()
  @ApiProperty({
    description: 'Album id favorites',
    format: '[uuid]',
  })
  albums: string[];
  @IsArray()
  @ApiProperty({
    description: 'Track id favorites',
    format: '[uuid]',
  })
  tracks: string[];
  constructor(partial: Partial<IFavorites>) {
    Object.assign(this, partial);
  }
}
