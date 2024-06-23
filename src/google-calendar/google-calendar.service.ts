import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  getAuthUrl() {
    const scopes = [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    console.log(tokens)
    this.oauth2Client.setCredentials(tokens);
    return tokens;
  }

  // async createGoogleMeetEvent(authTokens) {
  //   this.oauth2Client.setCredentials(authTokens);
  //   const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

  //   const event = {
  //     summary: 'Google Meet Meeting',
  //     description: 'A meeting to discuss NestJS integration with Google APIs.',
  //     start: {
  //       dateTime: '2024-06-17T10:00:00-07:00',
  //       timeZone: 'America/Los_Angeles',
  //     },
  //     end: {
  //       dateTime: '2024-06-17T11:00:00-07:00',
  //       timeZone: 'America/Los_Angeles',
  //     },
  //     conferenceData: {
  //       createRequest: {
  //         requestId: 'sample123',
  //         conferenceSolutionKey: {
  //           type: 'hangoutsMeet',
  //         },
  //       },
  //     },
  //     attendees: [
  //       { email: 'attendee1@example.com' },
  //       { email: 'attendee2@example.com' },
  //     ],
  //   };

  //   const response = await calendar.events.insert({
  //     calendarId: 'primary',
  //     resource: event,
  //     conferenceDataVersion: 1,
  //   });

  //   return response.data;
  // }
}