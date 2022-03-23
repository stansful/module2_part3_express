import express from 'express';
import multer from 'multer';
import { Controller } from '../helpers/controller_interface';
import { config } from '../config/config';
import { galleryService } from './gallery_service';
import { authService } from '../auth/auth_service';

const upload = multer({ dest: config.static.path.uploads });

class GalleryController implements Controller {
  public path: string;
  public router: express.Router;

  constructor() {
    this.path = '/gallery';
    this.router = express.Router();

    this.addRoutes();
  }

  private addRoutes() {
    this.router
      .route('/gallery')
      .all(authService.validateToken)
      .get(galleryService.getRequiredPictures)
      .post(upload.single('picture'), galleryService.createPicture);
  }
}

export const galleryRouter = new GalleryController().router;
