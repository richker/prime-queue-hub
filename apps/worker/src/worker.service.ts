import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import bigInt from 'big-integer';

const THRESHOLD_VALUE = process.env.THRESHOLD_VALUE
  ? Number(process.env.THRESHOLD_VALUE)
  : 10000;

@Injectable()
@Processor('jobs')
export class JobsProcessor {
  private readonly logger = new Logger(JobsProcessor.name);

  @Process('calculatePrime')
  async handleCalculatePrime(job: Job<{ n: number }>): Promise<number> {
    try {
      return this.calculateNthPrime(job.data.n);
    } catch (error) {
      this.logger.error(
        `Error calculating the Nth prime for N=${job.data.n}: ${error.message}`,
      );
      throw new Error(
        `Failed to calculate the Nth prime number for N=${job.data.n}.`,
      );
    }
  }

  private calculateNthPrime(N: number): number {
    return N < THRESHOLD_VALUE
      ? this.calculateNthPrimeUsingSieve(N)
      : this.calculateNthPrimeUsingMillerRabin(N);
  }

  private calculateNthPrimeUsingSieve(N: number): number {
    if (N === 1) return 2;

    const upperBound = this.estimateUpperBound(N);
    const sieve = this.initializeSieve(upperBound);
    this.markNonPrimesInSieve(sieve, upperBound);

    return this.extractNthPrimeFromSieve(sieve, N);
  }

  private estimateUpperBound(N: number): number {
    return Math.ceil(N * (Math.log(N) + Math.log(Math.log(N))));
  }

  private initializeSieve(upperBound: number): boolean[] {
    const sieve: boolean[] = Array(upperBound + 1).fill(true);
    sieve[0] = false;
    sieve[1] = false;
    return sieve;
  }

  private markNonPrimesInSieve(sieve: boolean[], upperBound: number): void {
    for (let i = 2; i <= Math.sqrt(upperBound); i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= upperBound; j += i) {
          sieve[j] = false;
        }
      }
    }
  }

  private extractNthPrimeFromSieve(sieve: boolean[], N: number): number {
    const primes = sieve.reduce((primes, isPrime, index) => {
      if (isPrime) primes.push(index);
      return primes;
    }, []);
    return primes[N - 1];
  }

  private calculateNthPrimeUsingMillerRabin(N: number): number {
    if (N === 1) return 2;

    let count = 1;
    let num = 3;
    while (count < N) {
      if (this.isPrimeUsingMillerRabin(num)) {
        count++;
      }
      if (count < N) num += 2;
    }

    return num;
  }

  private isPrimeUsingMillerRabin(n: number, k: number = 5): boolean {
    if (n <= 1 || (n > 2 && n % 2 === 0)) return false;

    let s = 0;
    let d = bigInt(n - 1);
    while (d.isEven()) {
      d = d.divide(2);
      s++;
    }

    for (let i = 0; i < k; i++) {
      if (!this.isWitnessPrime(n, d, s)) return false;
    }

    return true;
  }

  private isWitnessPrime(n: number, d: bigInt.BigInteger, s: number): boolean {
    const a = bigInt.randBetween(2, n - 2);
    let x = this.modPow(a, d, bigInt(n));

    if (x.equals(1) || x.equals(n - 1)) return true;

    for (let r = 1; r < s; r++) {
      x = this.modPow(x, bigInt(2), bigInt(n));
      if (x.equals(n - 1)) return true;
    }

    return false;
  }

  private modPow(
    base: bigInt.BigInteger,
    exponent: bigInt.BigInteger,
    modulus: bigInt.BigInteger,
  ): bigInt.BigInteger {
    return base.modPow(exponent, modulus);
  }
}
