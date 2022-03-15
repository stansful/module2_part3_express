import { Router } from 'express';
import { getRequiredPictures, createPictures } from './gallery_service';

const galleryRouter = Router();

galleryRouter.route('/gallery').get(getRequiredPictures).post(createPictures);

export { galleryRouter };
