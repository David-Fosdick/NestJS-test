import { IsNotEmpty } from 'class-validator';
export class AddRoleDto {
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  username: string;
}
