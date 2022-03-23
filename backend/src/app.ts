import express from 'express';
import { NotFound } from './exception/http/not_found';
import { config } from './config/config';
import { errorService } from './error/error_service';
import { Controller } from './helpers/controller_interface';

export class App {
  public app: express.Express;
  private readonly port: number;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.port = config.env.PORT;

    this.middlewares();
    this.static();
    this.controllers(controllers);
    this.errorHandler();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private static() {
    this.app.use(express.static('static/pictures'), express.static('static/frontend'));
  }

  private controllers(controllers: Controller[]) {
    controllers.forEach((controller) => this.app.use('/', controller.router));

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
