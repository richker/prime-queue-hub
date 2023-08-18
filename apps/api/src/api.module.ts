import { Module, Logger } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ApiController } from './api.controller';
import { JobsService } from './api.service';
import { bullConfig, queueConfig } from '../../../src/shared/bull.config';

@Module({
  imports: [
    BullModule.forRoot(bullConfig),
    BullModule.registerQueue(queueConfig),
  ],
  controllers: [ApiController],
  providers: [JobsService],
})
export class ApiModule {
  private readonly logger = new Logger(ApiModule.name);

  constructor() {
    this.logger.log('API Module initialized');
  }
}
