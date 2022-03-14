import { Router } from '../framework/router';
import { VoidHandler } from '../framework/framework_interfaces';
import { galleryService } from './gallery_service';

const galleryRouter = new Router();

galleryRouter.get('/gallery', galleryService as VoidHandler);

export { galleryRouter };
