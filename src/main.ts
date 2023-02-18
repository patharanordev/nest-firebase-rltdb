import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: configService.get<string>('FIREBASE_REALTIME_DATABASE'),
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
