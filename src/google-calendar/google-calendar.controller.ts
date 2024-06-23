import { Controller, Post, Body } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { CreateGoogleMeetDto } from './dto/create-google-calendar.dto';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) { }


  @Post("create")
  create(@Body() createGoogleMeetDto: CreateGoogleMeetDto){
    return this.googleCalendarService.createGoogleMeetEvent(createGoogleMeetDto)
  }
}
