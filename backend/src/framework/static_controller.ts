import { Router } from './router';
import { staticService } from './static_service';
import { config } from '../configs/config';

const staticRouter = new Router();

staticService.addStaticRoutes(
  config.static.files.pictures,
  config.static.path.pictures,
  staticRouter,
  staticService.streamHandler,
  config.mimeTypes.BIN,
);
staticService.addStaticRoutes(
  config.static.files.css,
  config.static.path.css,
  staticRouter,
  staticService.fileHandler,
  config.mimeTypes.CSS,
  '/css',
);
staticService.addStaticRoutes(
  config.static.files.js,
  config.static.path.js,
  staticRouter,
  staticService.fileHandler,
  config.mimeTypes.JS,
  '/js',
);
staticService.addStaticRoutes(
  config.static.files.frontend.filter((file) => file !== 'js' && file !== 'css'),
  config.static.path.frontend,
  staticRouter,
  staticService.fileHandler,
  config.mimeTypes.HTML,
);

export { staticRouter };
