import 'dotenv/config';
import { App } from './app';
import { authRouter } from './auth/auth_controller';
import { galleryRouter } from './gallery/gallery_controller';

const app = new App([authRouter, galleryRouter]);

app.listen();
