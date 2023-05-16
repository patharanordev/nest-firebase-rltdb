import { IsNotEmpty, IsOptional } from 'class-validator';
import { ProviderStatus, ProviderType } from '../enums/provider.enum';

export class ProviderInfoDto {
  @IsNotEmpty()
  providerId: string;

  @IsNotEmpty()
  status: ProviderStatus;

  @IsNotEmpty()
  type: ProviderType;
}

export class ProviderStatusInfoDto {
  @IsNotEmpty()
  providerId: string;

  @IsNotEmpty()
  status: ProviderStatus;
}
