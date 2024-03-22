class SocketChannel {
    socket: any;
    channel: string;
    config: any;
    private listeners: any = {};

    static connect(socket, name, config: Config) {
        const channel = new SocketChannel();
        channel.#init(socket, name, config);
        return channel;
    }

    #init(socket, channel, config: Config) {
        this.socket = socket;
        this.channel = channel;
        this.config = config;
        this.listeners = {};
        this.subscribe();
    }

    subscribe(): void {
        this.socket.emit("subscribe", {
            channel: this.channel,
        });

        let data = {
            channel_name: this.channel,
            socket_id: this.socket.auth?.sessionID,
        }

        if (this.config.broadcastUrl) {
            fetch('/pusher/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.status === 200) return response.json();
                return false;
            }).catch((error) => {
                //! ignore
            }).then((data) => {
                if (data !== false) {
                    this.socket.emit("subscribe", {
                        channel: `private-${this.channel}`
                    })
                }
            });
        }
    }

    unsubscribe(): void {
        this.socket.emit("unsubscribe", {
            channel: this.channel,
        });
    }

    whisper(event, data: Object): SocketChannel {
        this.socket.emit("whisper", {
            channel: this.channel,
            event: event,
            data: data,
        });
        return this;
    }

    speak(event, data: Object): SocketChannel {
        this.socket.emit("speak", {
            channel: this.channel,
            event: event,
            data: data,
        });
        return this;
    }

    listen(event: any, callback: Function): SocketChannel {
        if (!this.listeners[event]) {
            this.listeners[event] = (data) => {
                callback(data);
            };
            this.socket.on(event, this.listeners[event]);
        }
        return this;
    }

    listenForWhisper(event, callback) {
        this.socket.on(`whisper:${event}`, callback);
    }

    emit(event, message) {
        this.socket.emit("emit", {
            channel: this.channel,
            event: event,
            data: message,
        });
    }

    broadcast(event, message) {
        this.socket.emit("broadcast", {
            channel: this.channel,
            event: event,
            data: message,
        });
    }
}

export default SocketChannel;
