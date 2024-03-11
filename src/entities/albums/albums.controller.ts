import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create album',
    description: 'Creates a new album',
  })
  @ApiCreatedResponse({
    description: 'The album has been created.',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    console.log(createAlbumDto);
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [Album],
  })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
  })
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          return new BadRequestException(
            'Bad request. artistId is invalid (not uuid)',
          );
        },
      }),
    )
    id: string,
  ) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album ID',
    required: true,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    schema: {
      type: '"Album"',
      example: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Test Album',
        year: 1991,
        artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        name: {
          type: 'string',
          example: 'Test album',
        },
        year: {
          type: 'number',
          example: '1991',
        },
        ArtistId: {
          type: 'string',
          format: 'uuid',
          nullable: true,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          return new BadRequestException(
            'Bad request. ArtistId is invalid (not uuid)',
          );
        },
      }),
    )
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Deletes album by ID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album ID',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The artist has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.albumsService.remove(id);
  }
}
