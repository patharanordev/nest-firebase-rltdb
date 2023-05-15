import { Injectable } from '@nestjs/common';
import { 
  MessageDataDto,
  MessageDataWithTopicDto,
  MessageContentDto, 
  MessageContentWithTopicDto,
} from './dto/message-content.dto';
import { Messaging } from './interface/messages.interface';

import * as admin from 'firebase-admin';

@Injectable()
export class MessagesService {

  // TODO: POC registrationTokens
  async sendToSpecificClient() {
    // Ref. https://firebase.google.com/docs/cloud-messaging/send-message
    return null;
  }

  async sendData(msg: MessageDataDto) {
    return await this.send({
      token: msg.token,
      data: msg.data,
    })
  }

  async sendDataWithTopic(msg: MessageDataWithTopicDto) {
    return await this.send({
      topic: msg.topic,
      data: msg.data,
    })
  }

  async sendNotificationWithTopic(msgWithTopic: MessageContentWithTopicDto) {
    return await this.send({
      condition: `\'${msgWithTopic.topic}\' in topics`,
      notification: {
        title: msgWithTopic.title,
        body: msgWithTopic.body,
      },
    })
  }

  async sendNotification(msg: MessageContentDto) {
    return await this.send({
      token: msg.token,
      notification: {
        title: msg.title,
        body: msg.body,
      },
    })
  }

  async send(msg: Messaging) {
    try {
      const result = await admin.messaging().send(msg)
      .then((response) => ({ data: response, error: null }))
      .catch((error) => ({ data: null, error }));

      return result

    } catch (error) {
      return { data: null, error };
    }
  }
}
