# Masonite Broadcast Client (WIP)

<p align="center">
    <img src="https://banners.beyondco.de/Masonite%20Broadcast%20Client.png?theme=light&packageManager=yarn+add&packageName=masonite-broadcast-client&pattern=charlieBrown&style=style_2&description=Broadcast+client+for+masonite+framework.&md=1&showWatermark=1&fontSize=100px&images=adjustments&widths=50&heights=50">
</p>


> This is a library providing client side support for the Masonite broadcast driver.

> [Broadcast Driver Link for Backend](https://github.com/yubarajshrestha/masonite-socketio-driver)

> [Broadcast Server](https://github.com/yubarajshrestha/masonite-broadcast-server)


<p align="center">
  <img alt="Version" src="https://img.shields.io/npm/v/masonite-broadcast-client">
  <img alt="Issues" src="https://img.shields.io/github/issues/yubarajshrestha/masonite-broadcast-client">
  <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/yubarajshrestha/masonite-broadcast-client">
  <img alt="License" src="https://img.shields.io/github/license/yubarajshrestha/masonite-broadcast-client">
  <a href="https://github.com/yubarajshrestha/masonite-permission/stargazers"><img alt="star" src="https://img.shields.io/github/stars/yubarajshrestha/masonite-broadcast-client" /></a>
  <img alt="downloads" src="https://img.shields.io/npm/dm/masonite-broadcast-client" />
</p>

**Installation**

```sh
$ npm install masonite-broadcast-client socket.io-client
$ yarn add masonite-broadcast-client socket.io-client
```

**Example**

```js
window.io = require("socket.io-client");
const MasoniteBroadcastClient = require("masonite-broadcast-client");

const socket = new MasoniteBroadcastClient({
  url: "http://localhost:9000",
  channel: "default",
});

const channel = socket.join("default");

channel.listen('message', (data) => {
    console.log(data);
}).listen('your-event', (data) => {
    console.log(data);
})...;

/** You can join to other channels as well */

const chat = socket.join("chat");
chat.listen('message', (data) => {
    console.log(data);
}).listen('your-event', (data) => {
    console.log(data);
})...;


/** Broadcast to all */
chat.speak("your-event", your_data_here)

/** Broadcast to all except the sender */
chat.whisper("your-event", your_data_here)

/** You can also channel all methods */

chat.speak("your-event", your_data_here).whisper("your-event", your-data_here);

```