import { NextFunction, Request, Response } from 'express';
import { fsService } from '../fs/fs_service';
import { config } from '../config/config';
import path from 'path';

class LoggerService {
  private readonly logsPath: string;

  constructor() {
    this.logsPath = config.static.path.logs;
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

  public async logRequestInfo(req: Request, res: Response, next: NextFunction) {
    const data = this.createLog(req);
    await this.createLogFolderIfNotExist();
    await fsService.appendFile(path.join(this.logsPath, 'Test-log.txt'), data);
    next();
  }
}

export const logRequestInfo = (req: Request, res: Response, next: NextFunction) => {
  const loggerService = new LoggerService();
  return loggerService.logRequestInfo(req, res, next);
};
