const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const path = require('path');
const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  client.subscribe('esliTest/#');
});

let data = {
  flama: '',
  humo: '',
  luzAmbiental: ''
};
client.on('message', (topic, message) => {
  switch (topic) {
    case "esliTest/Flama":
      data.flama = message.toString();
      break;
    case "esliTest/Humo":
      data.humo = message.toString();
      break;
    case "esliTest/LuzAmbiental":
      data.luzAmbiental = message.toString();
      break;
  }
  console.log(`Topic[${topic}]: ${message}`);
});

app.get('/flama', (req, res) => {
  res.json(data);
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index3.html');
})

app.get('/publish', (req, res) => {
  client.publish('focoEsli', "Foco Mqtt");
  /*
  client.publish('esliTest/Flama', 'flama');
  client.publish('esliTest/Humo', 'Humo');
  client.publish('esliTest/LuzAmbiental', 'Es de dia');
  */
  console.log('publishLocal');
  res.status(200);
  res.json("Msj")
})


app.listen(3000);