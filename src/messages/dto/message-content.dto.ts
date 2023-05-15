import { IsNotEmpty } from 'class-validator';

export class MessageDataDto {
  @IsNotEmpty()
  data: any;

  @IsNotEmpty()
  token: string;
}

export class MessageDataWithTopicDto {
  @IsNotEmpty()
  data: any;

  @IsNotEmpty()
  topic: string;
}

export class MessageContentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  token: string;
}

export class MessageContentWithTopicDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  topic: string;
}