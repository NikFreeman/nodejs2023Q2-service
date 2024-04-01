import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { stat, appendFile } from 'node:fs/promises';
import { mkdirSync, writeFileSync } from 'node:fs';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  readonly LOGGING_LEVELS = {
    error: 0,
    warn: 1,
    log: 2,
    debug: 3,
    verbose: 4,
  };
  readonly DEFAULT_LOGGING_LEVEL = 0;
  readonly KiB = 1024;
  readonly DEFAULT_FILE_SIZE = 50;
  readonly LOG_EXTENSION = '.log';
  readonly ERROR_EXTENSION = '.error';
  readonly LOGGING_DIRECTORY = 'logs';
  private logLevel: number;
  private logFileSize: number;
  private logFile: string;
  private errFile: string;

  constructor(private readonly configService: ConfigService) {
    super();

    this.logLevel =
      configService.get('LOGGING_LEVEL') !== undefined
        ? parseInt(configService.get('LOGGING_LEVEL'))
        : this.DEFAULT_LOGGING_LEVEL;

    this.logFileSize =
      parseInt(configService.get('LOG_FILE_SIZE')) || this.DEFAULT_FILE_SIZE;

    this.logFile = this.newFilename(this.LOG_EXTENSION);
    this.errFile = this.newFilename(this.ERROR_EXTENSION);

    mkdirSync(this.LOGGING_DIRECTORY, { recursive: true });
    writeFileSync(path.join(this.LOGGING_DIRECTORY, this.logFile), '');
    writeFileSync(path.join(this.LOGGING_DIRECTORY, this.errFile), '');
  }

  log(message: any) {
    const MARKER = 'log';
    if (this.logLevel >= this.LOGGING_LEVELS.log) {
      super.log(message);
      this.logToFile(this.formattedMessage(message, MARKER));
    }
  }

  error(message: any, context = '') {
    const MARKER = 'error';
    if (this.logLevel >= this.LOGGING_LEVELS.error) {
      super.error(message, context);
      const errorMessage = this.formattedMessage(message, MARKER);
      this.logToFile(errorMessage);
      this.errToFile(errorMessage, context);
    }
  }

  warn(message: any) {
    const MARKER = 'warn';
    if (this.logLevel >= this.LOGGING_LEVELS.warn) {
      super.warn(message);
      this.logToFile(this.formattedMessage(message, MARKER));
    }
  }

  debug(message: any) {
    const MARKER = 'debug';
    if (this.logLevel >= this.LOGGING_LEVELS.debug) {
      super.debug(message);
      this.logToFile(this.formattedMessage(message, MARKER));
    }
  }

  verbose(message: any) {
    const MARKER = 'verbose';
    if (this.logLevel >= this.LOGGING_LEVELS.verbose) {
      super.verbose(message);
      this.logToFile(this.formattedMessage(message, MARKER));
    }
  }

  private formattedMessage(message: string, MARKER: string) {
    const result =
      new Date().toISOString() +
      ' ' +
      MARKER.toLocaleUpperCase() +
      ': ' +
      message +
      '\n';
    return result;
  }

  private newFilename(extension: string) {
    return new Date().toISOString().replaceAll(':', '-') + extension;
  }

  private async checkFile(fileName: string) {
    const extension = path.extname(fileName);
    const target = path.join(this.LOGGING_DIRECTORY, fileName);

    try {
      const fileSizeByte = (await stat(target)).size;
      if (fileSizeByte > this.logFileSize * this.KiB) {
        if (extension === this.LOG_EXTENSION) {
          this.logFile = this.newFilename(this.LOG_EXTENSION);
        }
        if (extension === this.ERROR_EXTENSION) {
          this.errFile = this.newFilename(this.ERROR_EXTENSION);
        }
      }
    } catch (error) {
      if (extension === this.LOG_EXTENSION) {
        this.logFile = this.newFilename(this.LOG_EXTENSION);
      }
      if (extension === this.ERROR_EXTENSION) {
        this.errFile = this.newFilename(this.ERROR_EXTENSION);
      }
    }
  }
  private async logToFile(message: string) {
    await this.checkFile(this.logFile);
    const targetPath = path.join(this.LOGGING_DIRECTORY, this.logFile);

    try {
      await this.appendToFile(targetPath, message);
    } catch (error) {
      console.error('Error on storing logs: ', error);
    }
  }

  private async errToFile(message: string, context = '') {
    await this.checkFile(this.errFile);
    const targetPath = path.join(this.LOGGING_DIRECTORY, this.errFile);

    try {
      await this.appendToFile(targetPath, message);
      await this.appendToFile(targetPath, context);
    } catch (error) {
      console.error('Error on storing logs: ', error);
    }
  }

  private async appendToFile(target: string, message: string) {
    await appendFile(target, message, { flag: 'a', encoding: 'utf-8' });
  }
}
