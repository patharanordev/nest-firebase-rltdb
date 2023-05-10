import { Body, Controller, Param, Post } from '@nestjs/common';
import { StatusService } from './status.service';
import { ProviderInfoDto } from './dtos/provider.dto';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post('/status/:id')
  async updateStatus(@Param() params): Promise<string> {
    return await this.statusService.updateStatus(params.id);
  }

  @Post('/provider-portal')
  async updateProvider(@Body() body: ProviderInfoDto): Promise<string> {
    return await this.statusService.updateProvider(body);
  }
}
