import { Router } from 'express';
import multer from 'multer';
import { getRequiredPictures, createPicture } from './gallery_service';
import { config } from '../config/config';
import { authService } from '../auth/auth_service';

const galleryRouter = Router();

const upload = multer({ dest: config.static.path.uploads });

galleryRouter.use(authService.validateToken);

galleryRouter.route('/gallery').get(getRequiredPictures).post(upload.single('picture'), createPicture);

export { galleryRouter };
