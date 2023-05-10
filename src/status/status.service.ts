import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ProviderInfoDto } from './dtos/provider.dto';

@Injectable()
export class StatusService {
  async updateStatus(id: string): Promise<string> {
    const rootRef = admin.database().ref('/');

    const result = new Promise<string>((resolve, reject) => {
      const timezone = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      const timestamp = new Date(Date.now() - timezone)
        .toISOString()
        .slice(0, -1);

      rootRef
        .child('dev')
        .child('payment')
        .child(id)
        .set(
          {
            status: 'payment-success',
            timedstamp: timestamp,
          },
          (err) => {
            if (err) {
              reject(err.message);
            } else {
              resolve('Done');
            }
          },
        );
    });

    return result;
  }

  async updateProvider(body: ProviderInfoDto): Promise<any> {
    const rootRef = admin.database().ref('/');

    const result = new Promise<string>((resolve, reject) => {
      rootRef
        .child('dev')
        .child('provider-portal')
        .child(body.providerId)
        .set(
          {
            ...body,
          },
          (err) => {
            if (err) {
              reject(err.message);
            } else {
              resolve('Done');
            }
          },
        );
    });

    return result;
  }
}
