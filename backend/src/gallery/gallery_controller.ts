import { Router } from 'express';
import { galleryService } from './gallery_service';

const galleryRouter = Router();

galleryRouter.get('/gallery', galleryService);

export { galleryRouter };
