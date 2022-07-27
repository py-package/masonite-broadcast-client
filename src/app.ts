import SocketChannel from './channels/socket-channel';

class MasoniteBroadcastClient {
    client: any;

    constructor(config: Config) {
        if (!config.url) {
            throw new Error('url is required');
        }
        this.client = SocketChannel.connect(config);
        this.registerInterceptors();
    }

    socketId() {
        return this.client.socketId;
    }

    // subscribe(channel: string) {
    //     this.client.subscribe(channel);
    // }

    whisper(event: string, message: any) {
        this.client.send(`whisper`, {
            type: event,
            to: "default",
            payload: message
        });
    }

    speak(event: string, message: any) {
        this.client.send(`speak`, {
            type: event,
            to: "default",
            payload: message
        });
    }

    listen(event: string, callback: Function) {
        this.client.listen(event, callback);
    }

    listenForWhisper(event: string, callback: Function) {
        this.client.listenForWhisper(event, callback);
    }

    registerInterceptors() {
        if (this.socketId()) {
            console.log("Socket ID: " + this.socketId());
        }
    }
}

// make it available to the outside world
(<any>window).MasoniteBroadcastClient = MasoniteBroadcastClient;

export default MasoniteBroadcastClient;
