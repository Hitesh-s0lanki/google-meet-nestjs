import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string

    @IsString()
    access_token:string
}
