import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GoogleCalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
