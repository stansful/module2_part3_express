import { Router } from 'express';
import multer from 'multer';
import { getRequiredPictures, createPicture } from './gallery_service';
import { config } from '../config/config';

const galleryRouter = Router();

const upload = multer({ dest: config.static.path.uploads });

galleryRouter.route('/gallery').get(getRequiredPictures).post(upload.single('picture'), createPicture);

export { galleryRouter };
