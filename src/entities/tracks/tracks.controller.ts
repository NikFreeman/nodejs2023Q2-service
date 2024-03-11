import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
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
import { Track } from './entities/track.entity';
@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create track',
    description: 'Creates a new track',
  })
  @ApiCreatedResponse({
    description: 'The track has been created.',
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get tracks list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [Track],
  })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Gets single track by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Track,
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
            'Bad request. TrackId is invalid (not uuid)',
          );
        },
      }),
    )
    id: string,
  ) {
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track ID',
    required: true,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    schema: {
      type: '"Track"',
      example: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Test track',
        albumId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        duration: 234,
      },
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        name: {
          type: 'string',
          example: 'Test track',
        },
        ArtistId: {
          type: 'string',
          format: 'uuid',
          nullable: true,
        },
        AlbumId: {
          type: 'string',
          format: 'uuid',
          nullable: true,
        },
        duration: {
          type: 'number',
          nullable: true,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Track was not found',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          return new BadRequestException(
            'Bad request. TrackId is invalid (not uuid)',
          );
        },
      }),
    )
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete track',
    description: 'Deletes track by ID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track ID',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The track has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
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
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.tracksService.remove(id);
  }
}
