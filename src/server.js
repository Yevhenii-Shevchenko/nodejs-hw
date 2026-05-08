import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import helmet from 'helmet';
import 'dotenv/config';



const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);



const message = "Hello world Evgeniy";



console.log(message);


app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Retrieved all notes",
  });
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
   res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`
  });
});

app.get("/test-error", () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  res.status(500).json({
    message: isProd ? "Server error" : err.message
  });
 });

app.listen(PORT, () => {console.log('Server is running on port 3000');
});
