import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StatusModule } from './status/status.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [ConfigModule, StatusModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
