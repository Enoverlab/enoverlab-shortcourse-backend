import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class GoogleAuthDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userimg: string;

  @IsBoolean()
  @IsNotEmpty()
  confirmedEmail : boolean;
}
