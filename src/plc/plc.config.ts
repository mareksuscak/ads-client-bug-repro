import { Injectable } from '@nestjs/common';

@Injectable()
export class PlcConfig {
  constructor() {}

  get host(): string | null {
    return '192.168.250.10';
  }
}
