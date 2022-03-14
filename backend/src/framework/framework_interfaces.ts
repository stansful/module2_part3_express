import { IncomingMessage, ServerResponse } from 'http';

export type HttpMethods = 'GET' | 'POST';

export type VoidHandler = (req?: IncomingMessage, res?: ServerResponse, url?: URL, body?: any) => Promise<void> | void;

export interface RouteMethods {
  [key: string]: VoidHandler;
}

export interface Routes {
  [key: string]: RouteMethods;
}
