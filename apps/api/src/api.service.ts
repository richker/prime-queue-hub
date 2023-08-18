import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(@InjectQueue('jobs') private jobsQueue: Queue) {}

  async enqueueJob(n: number): Promise<number | string> {
    try {
      const job = await this.jobsQueue.add('calculatePrime', { n });
      return job.id;
    } catch (error) {
      this.logger.error(`Error enqueuing job for N=${n}: ${error.message}`);
      throw error;
    }
  }

  async getJobStatus(jobId: number): Promise<any> {
    const job = await this.jobsQueue.getJob(jobId);
    if (!job) {
      this.logger.warn(`Job with ID ${jobId} not found.`);
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    const status = job.finishedOn ? 'completed' : 'in-progress';
    this.logger.log(`Fetched status for Job ID ${jobId}: ${status}`);
    return {
      jobId: jobId,
      status: status,
      input: job.data.n,
      result: job.returnvalue,
    };
  }

  async cancelJob(jobId: number): Promise<void> {
    const job = await this.jobsQueue.getJob(jobId);
    if (job) {
      await job.remove();
      this.logger.log(`Job with ID ${jobId} cancelled successfully.`);
    } else {
      this.logger.warn(`Attempted to cancel non-existent Job ID ${jobId}.`);
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }
  }
}
