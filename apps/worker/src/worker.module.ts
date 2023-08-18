import { Module, Logger } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { WorkerController } from './worker.controller';
import { JobsProcessor } from './worker.service';
import { bullConfig, queueConfig } from '../../../src/shared/bull.config';

@Module({
  imports: [
    BullModule.forRoot(bullConfig),
    BullModule.registerQueue(queueConfig),
  ],
  controllers: [WorkerController],
  providers: [JobsProcessor],
})
export class WorkerModule {
  private readonly logger = new Logger(WorkerModule.name);

  constructor() {
    this.logger.log('Worker Module initialized');
  }
}
