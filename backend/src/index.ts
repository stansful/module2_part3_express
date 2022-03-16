import 'dotenv/config';
import express from 'express';
import { config } from './config/config';
import { authRouter } from './auth/auth_controller';
import { galleryRouter } from './gallery/gallery_controller';
import { errorService } from './error/error_service';
import { authService } from './auth/auth_service';
import { logRequestInfo } from './logger/logger_service';

const app = express();
const PORT = config.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logRequestInfo);

app.use('/', express.static('static/pictures'), express.static('static/frontend'));

app.use(authRouter);

app.use(authService.validateToken);

app.use(galleryRouter);

app.use(errorService.handleError);

app.listen(PORT, () => {
  console.log(`Server started http://localhost:${PORT}`);
});
