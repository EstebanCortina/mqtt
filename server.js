const express = require('express');
const app = express();


const path = require('path');
const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  console.log("asd");
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index3.html');
})

app.get('/publish', (req, res) => {
  client.publish('focoEsli', 'Hola ESLI');
  console.log('publish');
  res.status(200);
  res.json("Msj")
})


app.listen(3000);