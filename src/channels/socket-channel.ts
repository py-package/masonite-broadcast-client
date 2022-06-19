import { io } from "socket.io-client";

class SocketChannel {
    socket: any;
    name: string;
    channels: { [name: string]: SocketChannel } = {};

    static connect(config: Config) {
        const channel = new SocketChannel();
        channel.__init(config);
        return channel;
    }

    __init(config: Config) {
        this.socket = io(config.url, {
            transports: ["websocket", "polling"],
            path: "/socket.io"
        });
        this.name = config.channel || "default";
        this.channels[config.channel] = this;
        this.__subscribe();
        this.socket.on("connect_error", this.__connect_error.bind(this));
        this.socket.on("connect", this.__connect.bind(this));
        this.socket.on("disconnect", this.__disconnect.bind(this));
        this.socket.on("reconnect", this.__reconnect.bind(this));

        // listen to any events
        // this.socket.onAny((event, ...args) => {
        //     console.log(event);
        //     console.log(args);
        // });

        this.socket.on('close', this.onClose.bind(this));
    }

    __connect_error() {
        this.socket.io.opts.transports = ["polling", "websocket"];
    }

    __connect() {
        console.log("connected");
    }

    __reconnect() {
        Object.values(this.channels).forEach((channel) => {
            channel.__subscribe();
        })
    }

    __subscribe() {
        this.socket.emit("subscribe", {
            channel: this.name,
            auth: {}
        });
    }

    __disconnect() {
        console.log('SocketChannel: disconnect', this.socket.id);
    }

    listen(event, callback) {
        this.socket.on(event, callback);
    }

    listenForWhisper(event, callback) {
        this.socket.on("whisper", (payload) => {
            if (payload.type === event) {
                callback(payload.payload);
            }
        });
    }

    onClose() {
        console.log('SocketChannel: close');
    }

    send(event, message) {
        console.log(event, message);
        this.socket.emit(event, message);
    }
}

export default SocketChannel;
