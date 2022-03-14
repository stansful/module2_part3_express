import { HttpMethods, Routes, VoidHandler } from './framework_interfaces';

export class Router {
  public routes: Routes;

  constructor() {
    this.routes = {};
  }

  private addRoute(method: HttpMethods, path: string, handler: VoidHandler) {
    const endpoint = this.routes[path];
    if (!endpoint) {
      this.routes[path] = {};
    }

    const endpointMethod = this.routes[path][method];
    if (!endpointMethod) {
      this.routes[path][method] = handler;
    } else {
      throw new Error(`Method: ${method} is already exist in ${endpoint}`);
    }
  }

  public get(path: string, handler: VoidHandler) {
    this.addRoute('GET', path, handler);
  }

  public post(path: string, handler: VoidHandler) {
    this.addRoute('POST', path, handler);
  }
}
