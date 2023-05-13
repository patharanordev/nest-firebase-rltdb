import { Injectable } from '@nestjs/common';
import { MessageContentDto } from './dto/message-content.dto';
import { MessagingPayload } from './interface/messages.interface';

import * as admin from 'firebase-admin';

@Injectable()
export class MessagesService {

  // TODO: POC registrationTokens
  async sendToSpecificClient() {
    // Ref. https://firebase.google.com/docs/cloud-messaging/send-message
    return null;
  }

  async sendWithData(messageContent: MessageContentDto) {
    try {
      const topic = 'TestFCM';

      const message = {
        // token: '....',
        data: {
          score: '850',
          time: '2:45'
        },
        topic: topic
      };

      const result = await admin.messaging().send(message)
      .then((response) => ({ data: response, error: null }))
      .catch((error) => ({ data: null, error }));

      return result

    } catch (error) {
      return { data: null, error };
    }
  }

  async sendWithNotification(messageContent: MessageContentDto) {
    try {
      // Define a condition which will send to devices which are subscribed
      // to either the Google stock or the tech industry topics.
      const condition = '\'TestFCM\' in topics';

      const message = {
        // token: '....',
        notification: {
          title: 'Test sent notification',
          body: messageContent.orderId,
        },
        condition: condition
      };

      const result = await admin.messaging().send(message)
      .then((response) => ({ data: response, error: null }))
      .catch((error) => ({ data: null, error }));

      return result

    } catch (error) {
      return { data: null, error };
    }
  }
}
