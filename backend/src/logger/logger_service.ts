import { config } from '../config/config';
import { fsService } from '../fs/fs_service';
import { NextFunction, Request, Response } from 'express';

class LoggerService {
  private readonly logsPath: string;
  private readonly logIntervalInMinutes: number;
  private isLogFolderCreated: boolean;
  private logFileName: string;

  constructor() {
    this.logsPath = config.static.path.logs;
    this.logIntervalInMinutes = config.env.LOG_INTERVAL_IN_MINUTES;
    this.isLogFolderCreated = false;
    this.logFileName = this.createLogFileName();
    this.startLogExpirationTime();
  }

  private async createLogFolderIfNotExist() {
    if (!this.isLogFolderCreated) {
      try {
        await fsService.checkExistFolder(this.logsPath);
      } catch (e) {
        await fsService.makeDirectory(this.logsPath, { recursive: true });
      }
      this.isLogFolderCreated = true;
    }
  }

  private startLogExpirationTime = () => {
    setTimeout(() => {
      const name = this.createLogFileName();
      this.updateLogFileName(name);
    }, this.logIntervalInMinutes * 6 * 10_000);
  };

  private updateLogFileName = (name: string) => {
    this.logFileName = name;
    this.startLogExpirationTime();
  };

  public createLogFileName(extension: string = '.txt') {
    return new Date().toUTCString() + extension;
  }

  public logger = async (reqOrMsg: Request | string, res: Response, next: NextFunction) => {
    await this.createLogFolderIfNotExist();

    if (typeof reqOrMsg === 'string') {
      const message = `Server response: ${reqOrMsg}\n`;
      await fsService.appendFile(`${this.logsPath}/${this.logFileName}`, message);
    } else {
      const message = `Request from IP: ${reqOrMsg.ip},   Time: ${new Date().toUTCString()}
      Url: ${reqOrMsg.url}
      Method: ${reqOrMsg.method}
      Cookies: ${JSON.stringify(reqOrMsg.cookies)}
      Headers: ${JSON.stringify(reqOrMsg.headers)}
      Body: ${JSON.stringify(reqOrMsg.body)}\n`;
      await fsService.appendFile(`${this.logsPath}/${this.logFileName}`, message);
    }
    next();
  };
}

export const loggerService = new LoggerService();
