import { io, Socket } from "socket.io-client";
import SocketChannel from './channels/socket-channel';

class MasoniteBroadcastClient {
    config: any;
    socket = undefined;
    channels: { [name: string]: SocketChannel } = {};

    constructor(config: Config) {
        if (!config.url) {
            throw new Error('url is required');
        }
        this.config = config;
        this.#connect();
    }

    #connect() {
        this.socket = io(this.config.url, {
            transports: ["websocket", "polling"],
            path: "/socket.io",
            autoConnect: false,
        });

        const sessionID = localStorage.getItem('sessionID');
        if (sessionID) {
            this.socket.auth = { sessionID };
            this.socket.connect();
        } else {
            this.socket.connect();
        }

        /** Handling Events */
        this.socket.on("session", ({ userID, sessionID }) => {
            this.socket.auth = { sessionID };
            localStorage.setItem('sessionID', sessionID);
            this.socket.userID = userID;
            this.socket.connect();
        });

        this.socket.on("reconnect", this.#reconnect.bind(this));
        this.socket.on("disconnect", this.#disconnect.bind(this));
        this.socket.on("error", this.#error.bind(this));
        this.socket.on("connect_error", this.#connect_error.bind(this));

        return this.socket;
    }

    #reconnect() {
        Object.values(this.channels).forEach((channel) => {
            channel.subscribe();
        })
    }

    #disconnect() {
        this.socket.disconnect();
    }

    #error() {
        console.log("error");
    }

    #connect_error() {
        this.socket.io.opts.transports = ["polling", "websocket"];
    }

    on(event: string, callback) {
        this.socket.on(event, callback);
    }

    onAny(callback) {
        this.socket.onAny(callback);
    }

    /** Subscribe to channel */
    subscribe(channel) {
        if (!this.channels[channel]) {
            this.channels[channel] = SocketChannel.connect(this.socket, channel, this.config);
        }
        return this.channels[channel];
    }

    onClientConnected(callback) {
        this.socket.on("user:connected", callback);
    }

    onClientDisconnected(callback) {
        this.socket.on("user:disconnected", callback);
    }
}

// make it available to the outside world
(<any>window).MasoniteBroadcastClient = MasoniteBroadcastClient;

export default MasoniteBroadcastClient;
