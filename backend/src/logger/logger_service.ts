import { NextFunction, Request, Response } from 'express';
import { fsService } from '../fs/fs_service';
import { config } from '../config/config';
import path from 'path';

class LoggerService {
  logsPath: string;

  constructor() {
    this.logsPath = config.static.path.logs;
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

  public async requestLogger(req: Request, res: Response, next: NextFunction) {
    const data = this.createLog(req);

    try {
      await fsService.checkExistFolder(this.logsPath);
    } catch (e) {
      await fsService.makeDirectory(this.logsPath, { recursive: true });
    }

    await fsService.appendFile(path.join(this.logsPath, 'Test-log.txt'), data);
    next();
  }
}

const saveContext = (req: Request, res: Response, next: NextFunction) => {
  const loggerService = new LoggerService();
  return loggerService.requestLogger(req, res, next);
};

export const loggerService = saveContext;
