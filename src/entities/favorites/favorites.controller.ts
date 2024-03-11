import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  ParseUUIDPipe,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
  HttpCode,
  HttpStatus,
  ParseEnumPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Entity } from 'src/interfaces/favorite';
@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get favorites list',
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':entity/:id')
  @ApiOperation({
    summary: 'add',
  })
  Add(
    @Param('entity', new ParseEnumPipe(Entity)) entity: string,
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          return new BadRequestException(
            'Bad request. AlbumId is invalid (not uuid)',
          );
        },
      }),
    )
    id: string,
  ) {
    const entitys = ['track', 'album', 'artist'];
    console.log(entity, !entitys.includes(entity));
    if (!entitys.includes(entity)) {
      throw new UnprocessableEntityException('Bad request. Entity not defined');
    }
    const result = this.favoritesService.add(entity, id);
    if (!result)
      throw new UnprocessableEntityException('Bad request. Id not found');
    return true;
  }

  @Delete(':entity/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('entity') entity: string,
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          return new BadRequestException(
            'Bad request. AlbumId is invalid (not uuid)',
          );
        },
      }),
    )
    id: string,
  ) {
    const entitys = ['track', 'album', 'artist'];
    console.log(entity, !entitys.includes(entity));
    if (!entitys.includes(entity)) {
      throw new NotFoundException('Bad request. Entity not defined');
    }
    return this.favoritesService.remove(entity, id);
  }
}
