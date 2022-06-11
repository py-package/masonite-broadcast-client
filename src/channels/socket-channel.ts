import { io } from "socket.io-client";

class SocketChannel {
    socket: any;

    static connect(url: string) {
        const channel = new SocketChannel();
        channel.__init(url);
        return channel;
    }

    __init(url = 'http://localhost:3000') {
        this.socket = io(url, {
            transports: ["websocket", "polling"],
            path: "/socket.io"
        });

        this.socket.on("connect_error", this.__connect_error.bind(this));

        this.socket.on("connect", this.__connect.bind(this));
        this.socket.on("disconnect", this.__disconnect.bind(this));

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

    __subscribe(channel: string, callback: Function) {
        this.socket.emit("join", {
            channel: channel,
            name: 'name',
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
