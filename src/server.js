import express from 'express';

const app = express();

const message = "Hello world Evgeniy";

console.log(message);

app.get("/notes", (req, res) => {res.status(200).json({
    "message": "Retrieved all notes",
  });
});

// app.get("/notes". () => {console.log();
// });


app.listen(3000, () => { console.log('Server is running on port 3000');
});
