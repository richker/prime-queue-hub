# Job Queue Management System

A microservices-based job queue management system built with NestJS. The system calculates the Nth prime number for each job and stores the results in a shared Redis database.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Enqueue jobs to calculate the Nth prime number.
- Retrieve the status and result of specific jobs.
- Cancel specific jobs.
- Asynchronous job processing using Bull queue.
- Efficient prime number calculation using the Sieve of Eratosthenes algorithm.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- [Redis](https://redis.io/)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo-link/job-queue-management-system.git
   cd job-queue-management-system
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

## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

This README provides a comprehensive guide to setting up and running the project. You can further customize it as per your project's requirements and additional features.