import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';
import { stat, appendFile } from 'node:fs/promises';
import { mkdirSync, writeFileSync } from 'node:fs';
import { cwd } from 'node:process';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  readonly LOGGING_LEVELS = [
    'log',
    'fatal',
    'error',
    'warn',
    'debug',
    'verbose',
  ];
  readonly KiB = 1024;
  readonly DEFAULT_FILE_SIZE = 50;
  readonly LOG_EXTENSION = '.log';
  readonly LOGGING_DIRECTORY = 'logs';
  private logLevel: Array<string>;
  private logFileSize: number;
  private loggingDirectory: string;
  private logFile: string;

  private shouldCreateNewFileLog = false;

  constructor(private readonly configService: ConfigService) {
    super();

    this.logLevel =
      configService.get('LOGGING_LEVEL') !== undefined
        ? JSON.parse(configService.get('LOGGING_LEVEL'))
        : this.LOGGING_LEVELS;

    this.logFileSize =
      parseInt(configService.get('LOG_FILE_SIZE')) || this.DEFAULT_FILE_SIZE;
    this.loggingDirectory = this.normalizePath(this.LOGGING_DIRECTORY);

    this.logFile =
      new Date().toISOString().replaceAll(':', '-') + this.LOG_EXTENSION;

    mkdirSync(this.loggingDirectory, { recursive: true });
    writeFileSync(path.join(this.loggingDirectory, this.logFile), '');
  }

  log(message: any) {
    const MARKER = 'log';
    if (this.logLevel.includes(MARKER)) {
      super.log(message);
      this.loggingMessage(message, MARKER);
    }
  }

  error(message: any, context = '') {
    const MARKER = 'error';
    if (this.logLevel.includes(MARKER)) {
      super.error(message, context);
      this.loggingMessage(message, MARKER);
    }
  }

  warn(message: any) {
    const MARKER = 'warn';
    if (this.logLevel.includes(MARKER)) {
      super.warn(message);
      this.loggingMessage(message, MARKER);
    }
  }

  debug(message: any) {
    const MARKER = 'debug';
    if (this.logLevel.includes(MARKER)) {
      super.debug(message);
      this.loggingMessage(message, MARKER);
    }
  }
  fatal(message: any, context?: string) {
    const MARKER = 'fatal';

    if (this.logLevel.includes(MARKER)) {
      super.fatal(message, context);
      this.loggingMessage(message, MARKER);
    }
  }
  verbose(message: any) {
    const MARKER = 'verbose';
    if (this.logLevel.includes(MARKER)) {
      super.verbose(message);
      this.loggingMessage(message, MARKER);
    }
  }

  private loggingMessage(message: string, MARKER: string) {
    const formattedMsg =
      new Date().toISOString() +
      ' ' +
      MARKER.toLocaleUpperCase +
      ' ' +
      message +
      '\n';
    this.logToFile(formattedMsg);
  }

  private normalizePath(target: string) {
    return path.isAbsolute(target)
      ? path.normalize(target)
      : path.join(cwd(), target);
  }

  private async checkFileLog(target: string) {
    if (this.shouldCreateNewFileLog) {
      return false;
    }
    let fileSizeByte: number;
    try {
      fileSizeByte = (await stat(target)).size;
    } catch (error) {
      this.shouldCreateNewFileLog = true;
    }
    if (fileSizeByte > this.logFileSize * this.KiB) {
      this.shouldCreateNewFileLog = true;
    }
  }

  private async logToFile(message: string) {
    let targetPath = path.join(this.loggingDirectory, this.logFile);
    await this.checkFileLog(targetPath);
    if (this.shouldCreateNewFileLog) {
      this.logFile =
        new Date().toISOString().replaceAll(':', '-') + this.LOG_EXTENSION;
      targetPath = path.join(this.loggingDirectory, this.logFile);
      this.shouldCreateNewFileLog = false;
    }
    try {
      await this.appendToFile(targetPath, message);
    } catch (error) {
      console.error('Error on storing logs: ', error);
    }
    process.nextTick(() => (this.shouldCreateNewFileLog = false));
  }

  private async appendToFile(target: string, message: string) {
    await appendFile(target, message, { flag: 'a', encoding: 'utf-8' });
  }
}
