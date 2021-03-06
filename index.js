const express = require("express");
const Led = require("./led");
const Buzzer = require("./buzzer");
const Music = require("./music");
const Button = require("./button");

const pinLed = 17;
const pinBuzzer = 18;
const pinButton = 23;

const app = express();
const led = new Led(pinLed);
const buzzer = new Buzzer(pinBuzzer);
const music = new Music(buzzer);
const button = new Button(pinButton);

const resetState = () => {
  led.off();
  buzzer.reset();
};

const buttonOnPushed = () => {
  resetState();
};
button.setOnPushedCallback(buttonOnPushed);

const onPackageDelivered = () => {
  led.on();
  music.playAny();
  led.blink();
};


app.get("/", (req, resp) => {
  resp.sendStatus(200);
});

app.get("/package/delivered", (req, resp) => {
  resp.sendStatus(200);
  onPackageDelivered();
});

app.get("/led/on", (req, resp) => {
  resp.sendStatus(200);
  led.on();
});

app.get("/led/blink", (req, resp) => {
  resp.sendStatus(200);
  led.blink();
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


resetState();
