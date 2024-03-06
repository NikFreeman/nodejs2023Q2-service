interface ICreateUserDto {
  login: string;
  password: string;
}
export class CreateUserDto implements ICreateUserDto {
  login: string;
  password: string;
}
