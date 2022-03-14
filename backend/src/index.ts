import 'dotenv/config';
import express from 'express';
import { config } from './configs/config';
import { userRouter } from './user/user_controller';
import { galleryRouter } from './gallery/gallery_controller';

const app = express();
const PORT = config.env.PORT;

app.use(express.json());

app.use('/', express.static('static/pictures'));
app.use('/', express.static('static/frontend'));

app.use(userRouter);
app.use(galleryRouter);

app.listen(PORT, () => {
  console.log(`Server started http://localhost:${PORT}`);
});
