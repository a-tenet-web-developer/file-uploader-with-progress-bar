const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer({ dest: './uploads/' });

let progressPercent = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const fileSize = file.size;

  // Reset progressPercent to 0 for each new file upload
  progressPercent = 0;

  // Simulate file upload progress
  const intervalId = setInterval(() => {
    if (progressPercent < 100) {
      progressPercent += 10; // Simulate progress increase
    } else {
      clearInterval(intervalId); // Stop the interval when progress reaches 100%
      res.send(`File uploaded successfully!`);
    }
  }, 1000); // Update every 1 second
});

app.get('/progress', (req, res) => {
  console.log(`Sending progress update: ${progressPercent.toFixed(2)}%`);
  res.json({ progress: progressPercent.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});