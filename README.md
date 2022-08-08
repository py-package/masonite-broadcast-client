# Masonite Broadcast Client (WIP)

<p align="center">
    <img src="https://banners.beyondco.de/Masonite%20Broadcast%20Client.png?theme=light&packageManager=yarn+add&packageName=masonite-broadcast-client&pattern=charlieBrown&style=style_2&description=Broadcast+client+for+masonite+framework.&md=1&showWatermark=1&fontSize=100px&images=adjustments&widths=50&heights=50">
</p>


> This is a library providing client side support for the Masonite broadcast driver.

**Masonite Broadcast Server and Client Library**
- [x] [Broadcast Driver - Backend](https://github.com/py-package/masonite-socketio-driver)
- [x] [Broadcast Server](https://github.com/py-package/masonite-broadcast-server)


<p align="center">
  <img alt="Version" src="https://img.shields.io/npm/v/masonite-broadcast-client">
  <img alt="Issues" src="https://img.shields.io/github/issues/py-package/masonite-broadcast-client">
  <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/py-package/masonite-broadcast-client">
  <img alt="License" src="https://img.shields.io/github/license/py-package/masonite-broadcast-client">
  <a href="https://github.com/py-package/masonite-broadcast-client/stargazers"><img alt="star" src="https://img.shields.io/github/stars/py-package/masonite-broadcast-client" /></a>
  <img alt="downloads" src="https://img.shields.io/npm/dm/masonite-broadcast-client" />
</p>

**Installation**

```sh
$ npm install masonite-broadcast-client socket.io-client
$ yarn add masonite-broadcast-client socket.io-client
```

**Example**

```js
/** Connection */

window.io = require("socket.io-client");
const MasoniteBroadcastClient = require("masonite-broadcast-client");

const broadcast = new MasoniteBroadcastClient({
    url: "http://localhost:3000",
    broadcastUrl: "http://localhost:8000/broadcast/auth" // optional
});

broadcast.onUserConnected(user => {
    console.log(`${user.userID} connected`);
});
```
```js
/** You can add an extra value in session */

broadcast.setExtra("value", (user) => { // value here must not be complex data types
    console.log(user);
})
```
```js
/** Subscribe to channel */

const subscription = broadcast.subscribe("chat");
```
```js
/** Broadcast to all */

subscription.emit("your-event", your_data_here)
```
```js
/** Broadcast to all except the sender */

subscription.broadcast("your-event", your_data_here);
```
```js
/** Listen for events */

subscription.listen('message', (data) => {
    console.log(data);
}).listen('your-event', (data) => {
    console.log(data);
});
```