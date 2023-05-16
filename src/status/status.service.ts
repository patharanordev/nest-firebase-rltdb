import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { resolve } from 'path';
import { ProviderInfoDto, ProviderStatusInfoDto } from './dtos/provider.dto';

@Injectable()
export class StatusService {
  private readonly rootRef = admin.database().ref('/');
  async updateStatus(id: string): Promise<string> {

    const result = new Promise<string>((resolve, reject) => {
      const timezone = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      const timestamp = new Date(Date.now() - timezone)
        .toISOString()
        .slice(0, -1);

      this.rootRef
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

    const result = new Promise<string>((resolve, reject) => {
      this.rootRef
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

  async setProviderRealTimeStatus(body: ProviderStatusInfoDto): Promise<any> {
    const result = new Promise<string>((resolve, reject) => {
      this.rootRef
        .child('Develop')
        .child('providerSession')
        .child(body.providerId)
        .child('status')
        .set(body.status,
          (err) => {
            if (err) {
              reject(err.message);
            } else {
              resolve('Done');
            }
          });
    });

    return result;
  }
}
