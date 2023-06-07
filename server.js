const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = 3000;

let collectedKeystrokes = [];

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/keystrokes', (req, res) => {
  const durations = req.body.durations;
  const location = req.body.location;
  const latitude = location ? location.latitude : null;
  const longitude = location ? location.longitude : null;
  const { mean, variance } = calculateMeanVariance(durations);
  console.log('Location:', { latitude, longitude });
  console.log('Mean:', mean);
  console.log('Variance:', variance);
  console.log();
  res.sendStatus(200);
});

function calculateMeanVariance(values) {
  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / values.length;

  const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length;

  return { mean, variance };
}

app.get('/keystrokes', (req, res) => {
  res.json(collectedKeystrokes);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
