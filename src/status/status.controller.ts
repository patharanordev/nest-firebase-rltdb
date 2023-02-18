import { Controller, Param, Post } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post('/status/:id')
  async updateStatus(@Param() params): Promise<string> {
    return await this.statusService.updateStatus(params.id);
  }
}
