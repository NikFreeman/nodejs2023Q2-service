import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
