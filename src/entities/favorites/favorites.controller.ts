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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Entity } from 'src/interfaces/favorite';
@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get favorites list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    schema: {
      type: 'object',
      properties: {
        artists: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Artist',
          },
        },
        albums: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Album',
          },
        },
        tracks: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Track',
          },
        },
      },
    },
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':entity/:id')
  @ApiOperation({
    summary: 'add album/artist/track to favorite',
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Not found',
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

    if (!entitys.includes(entity)) {
      throw new UnprocessableEntityException('Bad request. Entity not defined');
    }
    const result = this.favoritesService.add(entity, id);
    if (!result)
      throw new UnprocessableEntityException('Bad request. Id not found');
    return true;
  }

  @Delete(':entity/:id')
  @ApiOperation({
    summary: 'delete album/artist/track from favorite',
  })
  @ApiNoContentResponse({
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
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

    if (!entitys.includes(entity)) {
      throw new NotFoundException('Bad request. Entity not defined');
    }
    return this.favoritesService.remove(entity, id);
  }
}
