export class SocketIoChannel {
    socket: any;
    options: any;
    name: any;
    private listeners: any = {};

    constructor(socket, name, options) {
        this.socket = socket;
        this.name = name;
        this.options = options;
        this.listeners = {};
        this.subscribe();
    }

    speak(event: any, data: Object): SocketIoChannel {
        this.socket.emit('speak', {
            channel: this.name,
            event: event,
            message: data,
            auth: this.options.authToken || {}
        });
        return this;
    }

    whisper(event: any, data: Object): SocketIoChannel {
        this.socket.emit('whisper', {
            channel: this.name,
            event: event,
            message: data,
            auth: this.options.authToken || {}
        });
        return this;
    }

    listen(event: any, callback: Function): SocketIoChannel {
        if (!this.listeners[event]) {
            this.listeners[event] = (data) => {
                callback(data);
            }
            this.socket.on(event, this.listeners[event]);
        }
        return this;
    }

    subscribe(): void {
        this.socket.emit('subscribe', {
            channel: this.name,
            auth: this.options.authToken || null
        });
    }

    unsubscribe(): void {
        this.socket.emit('unsubscribe', {
            channel: this.name,
            auth: this.options.auth || {}
        });
    }
}