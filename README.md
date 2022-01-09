##### Masonite Broadcast Client (Firiri)

This is a library providing client side support for the [Masonite SocketIO Broadcast](https://github.com/yubarajshrestha/socketio-masonite-driver) driver.

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

**Installation**

```sh
$ npm install --save masonite-broadcast-client
```

> Nnote: still in beta, please report any issues.
