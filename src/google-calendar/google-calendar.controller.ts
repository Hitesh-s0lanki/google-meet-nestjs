import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { Response } from 'express';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) { }

  @Get('auth')
  async googleAuth(@Res() res: Response) {
    const url = this.googleCalendarService.getAuthUrl();

    res.redirect(url);
  }



  @Get('callback')
  async googleAuthCallback(@Query('code') code: string) {
    console.log(code)
    const tokens = await this.googleCalendarService.getTokens(code);
    return tokens
    // const event:any = await this.googleCalendarService.createGoogleMeetEvent(tokens);
    // res.json(event);
  }
}
