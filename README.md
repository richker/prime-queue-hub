# Job Queue Management System

A microservices-based job queue management system built with NestJS. The system calculates the Nth prime number for each job and stores the results in a shared Redis database.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Error Handling and Logging](#error-handling-and-logging)


## Features

- Enqueue jobs to calculate the Nth prime number.
- Retrieve the status and result of specific jobs.
- Cancel specific jobs.
- Asynchronous job processing using Bull queue.
- Dynamic prime number calculation based on a threshold:
   - Uses the Sieve of Eratosthenes algorithm for numbers below the threshold.
   - Uses the Miller-Rabin test for numbers at or above the threshold.
- Comprehensive error handling and logging for debugging and monitoring.
- Input validation to ensure data integrity.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- [Redis](https://redis.io/)

## Setup

1. **Clone the Repository**

   ```bash
   git clone git@github.com:richker/prime-queue-hub.git
   cd prime-queue-hub
   ```

2. **Install Dependencies**

   Navigate to both the API and Worker directories and install the required packages.

   ```bash
   cd api
   npm install

   cd ../worker
   npm install
   ```

3. **Setup Redis**

   Ensure Redis is installed and running on your machine.

   ```bash
   redis-server
   ```

## Running the Project

1. **Start the API Service**

   Navigate to the API directory and start the service.

   ```bash
   cd api
   npm run start
   ```

   The API service will start on `http://localhost:3000`.

2. **Start the Worker Service**

   In a separate terminal, navigate to the Worker directory and start the service.

   ```bash
   cd worker
   npm run start
   ```

   The Worker service will start and listen for incoming jobs.

## API Endpoints

- **Enqueue a Job**

  `POST /jobs`

  Body: `{ "n": <number> }`

- **Retrieve Job Status**

  `GET /jobs/:id`

- **Cancel a Job**

  `DELETE /jobs/:id`


 ## Error Handling and Logging

- Comprehensive error handling has been implemented using NestJS's exception filters.
- All errors, including validation errors, are logged for easier debugging and monitoring.
- The system uses NestJS's built-in Logger for logging.