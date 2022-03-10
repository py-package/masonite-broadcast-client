##### Masonite Broadcast Client (Sarara)

This is a library providing client side support for the [Masonite SocketIO Broadcast](https://github.com/yubarajshrestha/socketio-masonite-driver) driver.

<p align="center">
<a href="https://github.com/yubarajshrestha/masonite-broadcast-client/actions"><img src="https://github.com/yubarajshrestha/masonite-broadcast-client/actions/workflows/tests.yml/badge.svg" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/masonite-broadcast-client"><img src="https://img.shields.io/npm/dt/masonite-broadcast-client" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/masonite-broadcast-client"><img src="https://img.shields.io/npm/v/masonite-broadcast-client" alt="Latest Stable Version"></a>
<a href="https://www.npmjs.com/package/masonite-broadcast-client"><img src="https://img.shields.io/npm/l/masonite-broadcast-client" alt="License"></a>
</p>

**Installation**

```sh
$ npm install --save masonite-broadcast-client socket.io-client
```

**Example**

```js
window.io = require("socket.io-client");
const Sarara = require("masonite-broadcast-client");

const socket = new Sarara({
  url: "http://localhost:9000",
  namespace: "/",
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

> Note: still in beta, please report any issues.

**Insipration**

- [x] [Laravel Echo](https://github.com/laravel/echo)
