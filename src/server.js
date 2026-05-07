import express from 'express';

const app = express();

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
  res.status(500).json({
    message: err.message
    // message: "Houston has broblem"
  });
 });

app.listen(3000, () => { console.log('Server is running on port 3000');
});
