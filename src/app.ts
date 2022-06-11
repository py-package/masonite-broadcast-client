import SocketChannel from './channels/socket-channel';

type Config = {
    url: string,
}

class MasoniteBroadcastClient {
    client: any;

    constructor(config: Config) {
        if (!config.url) {
            throw new Error('url is required');
        }

        this.client = SocketChannel.connect(config.url);
    }

    subscribe(channel: string, callback: Function) {
        this.client.__subscribe(channel, callback);
    }

    unsubscribe(channel: string, callback: Function) {
        this.client.send(`leave`, {
            channel,
        });
        callback("You are unsubscribed from channel");
    }

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


}

// make it available to the outside world
(<any>window).MasoniteBroadcastClient = MasoniteBroadcastClient;

export default MasoniteBroadcastClient;
