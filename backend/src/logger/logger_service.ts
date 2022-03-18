import { config } from '../config/config';
import * as rotatingFileStream from 'rotating-file-stream';

class LoggerService {
  private readonly logsPath: string;
  private readonly logInterval: string;

  constructor() {
    this.logsPath = config.static.path.logs;
    this.logInterval = '1h';
  }

  public generateLogFileName(extension: string = '.txt') {
    return new Date().toUTCString() + extension;
  }

  public createLogStream = (fileName: string | rotatingFileStream.Generator): rotatingFileStream.RotatingFileStream => {
    return rotatingFileStream.createStream(fileName, {
      interval: this.logInterval,
      path: this.logsPath,
    });
  };
}

export const loggerService = new LoggerService();
