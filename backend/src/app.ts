import express, { Express, Router } from 'express';
import morgan from 'morgan';
import { NotFound } from './exception/http/not_found';
import { config } from './config/config';
import { errorService } from './error/error_service';
import { loggerService } from './logger/logger_service';

export class App {
  app: Express;
  port: number;

  constructor(routers: Router[]) {
    this.app = express();
    this.port = config.env.PORT;

    this.middlewares();
    this.static();
    this.controllers(routers);
    this.errorHandler();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      morgan('combined', {
        stream: loggerService.createLogStream(loggerService.generateLogFileName()),
      }),
    );
  }

  private static() {
    this.app.use('/', express.static('static/pictures'), express.static('static/frontend'));
  }

  private controllers(routers: Router[]) {
    routers.forEach((router) => this.app.use('/', router));

    this.app.all('*', () => {
      throw new NotFound('Path doest not exist');
    });
  }

  private errorHandler() {
    this.app.use(errorService.handleError);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started http://localhost:${this.port}`);
    });
  }
}
