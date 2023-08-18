import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JobsProcessor } from './worker.service';
import { Job } from 'bull';

@Controller()
export class WorkerController {
  private readonly logger = new Logger(WorkerController.name);

  constructor(private readonly jobsProcessor: JobsProcessor) {}

  @MessagePattern('calculatePrime')
  async calculatePrime(data: { n: number }): Promise<number> {
    try {
      // Mock Job object to match the expected input for handleCalculatePrime
      const mockJob: Job<{ n: number }> = {
        data: data,
      } as Job<{ n: number }>;

      return this.jobsProcessor.handleCalculatePrime(mockJob);
    } catch (error) {
      this.logger.error(`Error calculating prime: ${error.message}`);
      throw error;
    }
  }
}
