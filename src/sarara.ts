import { SocketIoChannel } from './channels';

class Sarara {
    options: any;
    channels: any;
    socket: any;

    constructor(options: any) {
        this.options = options;
        this.connect();
    }

    connect() {
        this.socket = io(this.options.url, this.options);
        this.socket.on('connect', () => {
            Object.values(this.channels).forEach((channel: SocketIoChannel) => channel.subscribe());
        });

        this.socket.on('disconnect', () => {
            console.log('disconnect');
        });
        this.socket.on('error', (error) => {
            this.error(error);
        });


        return this.socket;
    }

    join(channel) {
        if (!this.channels[channel]) {
            this.channels[channel] = new SocketIoChannel(this.socket, channel, this.options);
        }
        return this.channels[channel];
    }

    error(error) {
        console.error("Error on socket.io: ", error);
    }
}

export default Sarara;