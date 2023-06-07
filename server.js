const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = 3000;

// const cookie = require("cookie");
const os = require('os');
const fs = require('fs');



let collectedKeystrokes = [];

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//keystrokes

app.post("/keystrokes", (req, res) => {
  const durations = req.body.durations;
  const location = req.body.location;
  const latitude = location ? location.latitude : null;
  const longitude = location ? location.longitude : null;
  const { mean, variance } = calculateMeanVariance(durations);
  console.log("Location:", { latitude, longitude });
  console.log("Mean:", mean);
  console.log("Variance:", variance);
  console.log();
  res.sendStatus(200);
});

function calculateMeanVariance(values) {
  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / values.length;

  const squaredDifferences = values.map((val) => Math.pow(val - mean, 2));
  const variance =
    squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length;

  return { mean, variance };
}

app.get("/keystrokes", (req, res) => {
  res.json(collectedKeystrokes);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 

var ipAddr = ipAddr();

const networkInterfaces = os.networkInterfaces();

// Log network interface details
Object.keys(networkInterfaces).forEach(interfaceName => {
  const interfaces = networkInterfaces[interfaceName];

});


const platform = os.platform();
const release = os.release();
const type = os.type();
const architecture = os.arch();
 
function isLocalAddress(address) {
  return (
    address === '127.0.0.1' ||
    address === '::1' ||
    address.toLowerCase() === 'localhost'
  );
}

//location



//ip addr
function ipAddr(){
  fetch("https://api.ipify.org/?format=json")
    .then((response) => response.json())
    .then((dataa) => {
      const ipAddress = dataa.ip;
      global.ipAddress = ipAddress;



//forming json
const data = {
  osInfo: {
    platform,
    release,
    type,
    architecture,
  },
  networkInterfaces: Object.entries(networkInterfaces).reduce((result, [interfaceName, interfaces]) => {
    const filteredInterfaces = interfaces
      .filter(({ address }) => !isLocalAddress(address))
      .map(({ address, mac }) => ({ address, mac }));
    
    if (filteredInterfaces.length > 0) {
      result[interfaceName] = filteredInterfaces;
    }
    
    return result;
  }, {}),
  ipAddr: ipAddress,
};

const jsonData = JSON.stringify(data, null, 2);


fs.writeFile('./json-files/combinedData.json', jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('Combined JSON file created successfully.');
  }
});
})
.catch((error) => {
  console.error("Error:", error);
});
}