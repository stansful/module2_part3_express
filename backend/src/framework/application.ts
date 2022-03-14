import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { EventEmitter } from 'events';
import { config } from '../configs/config';
import { Router } from './router';
import { responseService } from '../response/response_service';
import { staticRouter } from './static_controller';

export class Application {
  private server: Server;
  private emitter: EventEmitter;

  constructor() {
    this.server = this.createServer();
    this.emitter = new EventEmitter();
    this.registerRouter(staticRouter);
  }

  private getExpandedUrl(reqUrl: string = ''): URL {
    const apiURL = `${config.env.PROTOCOL}://${config.env.DOMAIN}:${config.env.PORT}`;
    return new URL(`${apiURL}${reqUrl}`);
  }

  private receiveData(req: IncomingMessage, res: ServerResponse, url: URL) {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (body) {
        body = JSON.parse(body);
      }

      const event = this.emitter.emit(`${req.method}:${url.pathname}`, req, res, url, body);

      if (!event) {
        responseService.notFound(res);
      }
    });
  }

  private createServer() {
    return http.createServer((req, res) => {
      const url = this.getExpandedUrl(req.url);

      this.receiveData(req, res, url);
    });
  }

  public listen(port: number, callback: () => void): http.Server {
    return this.server.listen(port, callback);
  }

  public registerRouter(router: Router) {
    const endpoints = Object.keys(router.routes);

    endpoints.forEach((pathName) => {
      const methods = Object.keys(router.routes[pathName]);

      methods.forEach((method) => {
        const handler = router.routes[pathName][method];

        this.emitter.on(`${method}:${pathName}`, handler);
      });
    });
  }
}
