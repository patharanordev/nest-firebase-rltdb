import { Controller, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageContentDto } from './dto/message-content.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/send/data')
  async sendWithData(@Body() message: MessageContentDto) {
    return await this.messagesService.sendWithData(message);
  }

  @Post('/send/notification')
  async sendWithNotification(@Body() message: MessageContentDto) {
    return await this.messagesService.sendWithNotification(message);
  }
}
