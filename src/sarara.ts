import { SocketIoChannel } from './channels';

class Sarara {
    options: any;
    channels: { [name: string]: SocketIoChannel } = {};
    socket: any;

    constructor(options: any) {
        this.options = options;
        this.connect();
    }

    connect() {
        let io = this.getSocketIO();

        this.socket = io(this.options.url ?? 'http://localhost:9000', this.options);
        this.socket.on('reconnect', () => {
            Object.values(this.channels).forEach((channel) => channel.subscribe());
        });

        this.socket.on('disconnect', () => {
            console.log('disconnect');
        });
        this.socket.on('error', (error) => {
            this.error(error);
        });


        return this.socket;
    }

    join(channel) : SocketIoChannel {
        if (!this.channels[channel]) {
            this.channels[channel] = new SocketIoChannel(this.socket, channel, this.options);
        }
        return this.channels[channel];
    }

    error(error) {
        console.error("Error on socket.io: ", error);
    }

    /**
     * Get socket.io module from global scope or options.
     */
    getSocketIO(): any {
        if (typeof this.options.client !== 'undefined') {
            return this.options.client;
        }

        if (typeof io !== 'undefined') {
            return io;
        }

        throw new Error('Socket.io client not found. Should be globally available or passed via options.client');
    }
}

module.exports = Sarara