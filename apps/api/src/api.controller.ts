import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobsService } from './api.service';
import { JobDto } from './job.dto';

@Controller('jobs')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UsePipes(new ValidationPipe()) // This will validate the incoming request body against the JobDto
  async enqueueJob(
    @Body() jobDto: JobDto,
  ): Promise<{ jobId: number | string }> {
    try {
      const jobId = await this.jobsService.enqueueJob(jobDto.n);
      this.logger.log(`Job with ID ${jobId} enqueued successfully.`);
      return { jobId };
    } catch (error) {
      this.logger.error(`Error enqueuing job: ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  async getJobStatus(@Param('id') jobId: number): Promise<any> {
    try {
      return this.jobsService.getJobStatus(jobId);
    } catch (error) {
      this.logger.error(`Error fetching job status: ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  async cancelJob(@Param('id') jobId: number): Promise<string> {
    try {
      await this.jobsService.cancelJob(jobId);
      return 'Job cancelled!';
    } catch (error) {
      this.logger.error(`Error cancelling job: ${error.message}`);
      throw error;
    }
  }
}
