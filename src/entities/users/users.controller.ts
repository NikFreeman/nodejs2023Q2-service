import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  Put,
  ForbiddenException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user',
  })
  @ApiCreatedResponse({
    description: 'The user has been created.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Gets all users',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [User],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          return new HttpException(
            'Bad request. userId is invalid (not uuid)',
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    )
    id: string,
  ) {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User ID',
    required: true,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    schema: {
      type: '"User"',
      example: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        login: 'Test user',
        version: '2',
        createdAt: '1655000000',
        updateAt: '2346770000',
      },
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        login: {
          type: 'string',
          example: 'Test user',
        },
        version: {
          type: 'number',
          example: '2',
        },
        createdAt: {
          type: 'number',
          example: '1655000000',
        },
        updateAt: {
          type: 'number',
          example: '2346770000',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiForbiddenResponse({
    description: 'oldPassword is wrong',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          return new HttpException(
            'Bad request. userId is invalid (not uuid)',
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'User not found');
    }

    const result = this.usersService.update(id, updateUserDto);
    if (!result) {
      throw new ForbiddenException('old password wrong');
    }
    return result;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes user by ID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User ID',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
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
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'User not found');
    }

    this.usersService.remove(id);
  }
}
