import {Injectable} from '@nestjs/common';
import * as pack from '../package.json';

@Injectable()
export class AppService {
  home(): { uptime: string; version: string } {
    return { "uptime": process.uptime().toString(), "version": pack.version };
  }

}
