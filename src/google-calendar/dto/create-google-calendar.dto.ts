import { IsString, IsOptional, IsISO8601, ValidateNested, IsArray, ArrayMinSize, ArrayMaxSize, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class StartEndDto {
  @IsString()
  @IsISO8601({ strict: true })
  dateTime: string;

  @IsString()
  timeZone: string;
}

class AttendeeDto {
  @IsEmail()
  email: string;
}

export class CreateGoogleMeetDto {

    @IsString()
    email:string;

  @IsString()
  summary: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateNested()
  @Type(() => StartEndDto)
  start: StartEndDto;

  @ValidateNested()
  @Type(() => StartEndDto)
  end: StartEndDto;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => AttendeeDto)
  attendees?: AttendeeDto[];
}
