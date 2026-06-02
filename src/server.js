import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { connectMongoDB } from '../src/db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: '*',
  }),
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(logger);

const message = 'Hello world Evgeniy';
console.log(message);

app.use(notesRoutes);
app.use(authRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
