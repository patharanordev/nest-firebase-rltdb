import { Controller, Post, Body, Headers, ForbiddenException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { 
  MessageDataDto,
  MessageDataWithTopicDto,
  MessageContentDto,
  MessageContentWithTopicDto,
} from './dto/message-content.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  hasPermission(headers) {
    if(headers['x-api-key'] !== process.env.API_KEY) {
      throw new ForbiddenException()
    }
  }

  @Post('/send/client/data')
  async sendData(@Headers() headers, @Body() message: MessageDataDto) {
    this.hasPermission(headers);
    return await this.messagesService.sendData(message);
  }

  @Post('/send/client/notification')
  async sendNotification(@Headers() headers, @Body() message: MessageContentDto) {
    this.hasPermission(headers);
    return await this.messagesService.sendNotification(message);
  }

  @Post('/send/topic/data')
  async sendDataWithTopic(@Headers() headers, @Body() message: MessageDataWithTopicDto) {
    this.hasPermission(headers);
    return await this.messagesService.sendDataWithTopic(message);
  }

  @Post('/send/topic/notification')
  async sendNotificationWithTopic(@Headers() headers, @Body() message: MessageContentWithTopicDto) {
    this.hasPermission(headers);
    return await this.messagesService.sendNotificationWithTopic(message);
  }
}
