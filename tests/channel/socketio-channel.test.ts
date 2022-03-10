import { SocketIoChannel } from "../../src/channels";

describe('SocketIoChannel', () => {
    let channel;
    let socket;

    beforeEach(() => {
        const channelName = 'default';
        let listeners = [];
        socket = {
            emit: (event, data) => listeners.filter(([e]) => e === event).forEach(([, fn]) => fn(channelName, data)),
            on: (event, fn) => listeners.push([event, fn]),
            removeListener: (event, fn) => {
                listeners = listeners.filter(([e, f]) => (!fn ? e !== event : e !== event || f !== fn));
            },
        };

        channel = new SocketIoChannel(socket, channelName, {});
    });

    test('triggers all listeners for an event', () => {
        const bar = jest.fn();
        const baz = jest.fn();
        const world = jest.fn();

        channel.listen('Foo', bar);
        channel.listen('Bar', baz);
        channel.listen('Hello', world);

        socket.emit('Foo', {});
        socket.emit('Bar', {});

        expect(bar).toBeCalled();
        expect(baz).toBeCalled();
        expect(world).not.toBeCalled();

        socket.emit('Hello', {});

        expect(world).toBeCalled();
    });
});