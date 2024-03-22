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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
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
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Gets all artists',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [Artist],
  })
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  async findOne(
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
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist ID',
    required: true,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    schema: {
      type: '"Artist"',
      example: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Test Artist',
        grammy: true,
      },
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        name: {
          type: 'string',
          example: 'Test artist',
        },
        grammy: {
          type: 'boolean',
          example: 'false',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  async update(
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
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Deletes artist by ID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist ID',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The artist has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'Artist not found');
    }
    return await this.artistsService.remove(id);
  }
}
