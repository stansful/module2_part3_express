import 'dotenv/config';
import { App } from './app';
import { AuthController } from './auth/auth_controller';
import { GalleryController } from './gallery/gallery_controller';

const app = new App([new AuthController(), new GalleryController()]);

app.listen();
