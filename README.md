# Nestjs with Firebase's Realtime Database

> This content, excluding Firebase auth

## Preparation

### Firebase service account

Download service account (`*.json`) from Firebase console, it should look like this :

```json
{
  "type": "service_account",
  "project_id": "YOUR_PROJECT_ID",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvg.....9aSkqIJxHcom\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-???????@YOUR_PROJECT_ID.iam.gserviceaccount.com",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-???????%40YOUR_PROJECT_ID.iam.gserviceaccount.com"
}
```

add `project_id`, `private_key`, `client_email` and your `Realtime database URL` to your `.env` file.

```text
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvg.....9aSkqIJxHcom\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-???????@YOUR_PROJECT_ID.iam.gserviceaccount.com
FIREBASE_REALTIME_DATABASE=YOUR_REALTIME_DATABASE_URL
```

### Accessing to Firebase

In `src/main.ts`, initial Firebase admin :

```ts
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
```

and don't forget adding `ConfigModule` to `AppModule` in `app.module.ts` :

```ts
// ...
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  // ...
})
export class AppModule {}
```

Now you can connecting to Firebase, let's create sample service/API. In this case I assume that service is payment service, I will update payment status to the Firebase Realtime database.

### Implement update service

I created status service (`src/status/`), the service will update result to Firebase Realtime database by reference to user ID, I called `id` :

```ts
// Ref. src/status.controller.ts
// ...

@Controller()
export class StatusController {
  // ...

  @Post('/status/:id')
  async updateStatus(@Param() params): Promise<string> {
    return await this.statusService.updateStatus(params.id);
  }
}
```

In the service, just update payment status and current timestamp to specific path of our Firebase Realtime database `{FIREBASE_REALTIME_DATABASE}/{ENV}/{SERVICE_NAME}/{USER_ID}`.

> For production, please don't forget changing Firebase Realtime database child path to environment variable.

```ts
// Ref. src/status.service.ts

import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

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
}
```

## Usage

I prepared `Dockerfile.local` and `docker-compose.local.yml` to testing on localhost, just run :

```sh
docker-compose -f docker-compose.local.yml up --build
```

In this case it is `{FIREBASE_REALTIME_DATABASE}/dev/payment/t2`, please refer to image below :

- ENV: dev
- SERVICE_NAME: payment
- USER_ID: t2

![example-result-in-database](assets/ex-result-in-db.png)

> ---
> For timestamp, don't forget set timezone in `Dockerfile` too :
> 
> ```dockerfile
> # Set timezone
> ENV TZ=Asia/Bangkok
> RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
> ```
>
> ---

To stop the service :

```sh
docker-compose -f docker-compose.local.yml down -v
```
