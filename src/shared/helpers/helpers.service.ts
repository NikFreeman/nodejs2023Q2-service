import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HelpersService {
  getTimestamp(): number {
    return new Date().getTime();
  }
  getUUID() {
    return uuidv4();
  }
}
