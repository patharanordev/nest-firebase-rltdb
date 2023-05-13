import { IsNotEmpty } from 'class-validator';

export class MessageContentDto {
  @IsNotEmpty()
  orderId: string;
}
