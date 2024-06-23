import { HttpException, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { CreateGoogleMeetDto } from './dto/create-google-calendar.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client;

  constructor(
    private readonly prisma:PrismaService
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  async createGoogleMeetEvent(createGoogleMeetDto: CreateGoogleMeetDto) {

    const {email,
      ...info
     } = createGoogleMeetDto

    const user = await this.prisma.user.findUnique({
      where:{email}
    })

    if(!user){
      return new HttpException("User Not Found!", 400)
    }


    this.oauth2Client.setCredentials({ access_token: user.access_token });
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });


    const startTime = new Date();
    startTime.setHours(startTime.getHours() + 1);
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    const event = {
      ...info,
      conferenceData: {
        createRequest: {
          requestId: new Date().toISOString(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    try {
      const response = await calendar.events.insert({
        auth: this.oauth2Client,
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1,
      });

      console.log('Event created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }
}