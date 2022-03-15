import { NextFunction, Request, Response } from 'express';
import { fsService } from '../fs/fs_service';
import { config } from '../config/config';
import path from 'path';

class LoggerService {
  private readonly logsPath: string;
  private logsHour: number;
  private logFileName: string;

  constructor() {
    this.logsPath = config.static.path.logs;
    const date = new Date();
    this.logsHour = date.getHours();
    this.logFileName = date.toString() + '.txt';
  }

  private async createLogFolderIfNotExist() {
    try {
      await fsService.checkExistFolder(this.logsPath);
    } catch (e) {
      await fsService.makeDirectory(this.logsPath, { recursive: true });
    }
  }

  private createLog(req: Request): string {
    const spaces = '   ';
    const newLine = '\n';

    const title = `Incoming request from ip: ${req.ip}${newLine}`;
    const method = spaces + 'Method: ' + req.method + newLine;
    const url = spaces + 'Url: ' + req.url + newLine;
    const body = spaces + 'Body: ' + JSON.stringify(req.body) + newLine;
    const requestTime = spaces + 'Request time: ' + new Date() + newLine;

    return title + method + url + body + requestTime + newLine;
  }

  private checkHoursIfChangeCreateNewLogFileName() {
    const date = new Date();
    const currentHour = date.getHours();
    const isSame = this.logsHour === currentHour;
    if (!isSame) {
      this.updateLogHours(currentHour);
      this.updateLogFileName(date.toString());
    }
  }

  private updateLogFileName(date: string) {
    this.logFileName = date + '.txt';
  }

  private updateLogHours(newHours: number) {
    this.logsHour = newHours;
  }

  public async logRequestInfo(req: Request, res: Response, next: NextFunction) {
    const data = this.createLog(req);
    await this.createLogFolderIfNotExist();
    this.checkHoursIfChangeCreateNewLogFileName();
    await fsService.appendFile(path.join(this.logsPath, this.logFileName), data);
    next();
  }
}

export const logRequestInfo = (req: Request, res: Response, next: NextFunction) => {
  const loggerService = new LoggerService();
  return loggerService.logRequestInfo(req, res, next);
};