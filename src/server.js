import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import helmet from 'helmet';
import 'dotenv/config';
import { connectMongoDB } from '../db/connectMongoDB.js';
// import { Note } from './models/note.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: "*",
  }));
app.use(helmet());
app.use(express.json());
app.use(logger);



const message = "Hello world Evgeniy";



console.log(message);


// app.get("/notes", (req, res) => {
//   res.status(200).json({
//     message: "Retrieved all notes",
//   });
// });



app.get("/test-error", () => {
  throw new Error('Simulated server error');
});
app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);



await connectMongoDB();

app.listen(PORT, () => {console.log('Server is running on port 3000');
});
