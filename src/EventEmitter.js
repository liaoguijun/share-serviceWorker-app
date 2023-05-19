class EventEmitter {
    constructor() {
        this.observers = {};
    }

    on(events, listener) {
        events.split(' ').forEach(event => {
            this.observers[event] = this.observers[event] || [];
            this.observers[event].push(listener);
        });
        return this;
    }

    off(event, listener) {
        if (!this.observers[event]) return;
        if (!listener) {
            delete this.observers[event];
            return;
        }

        this.observers[event] = this.observers[event].filter(l => l !== listener);
    }

    emit(event, ...args) {
        if (this.observers[event]) {
            const cloned = [].concat(this.observers[event]);
            cloned.forEach(observer => {
                observer(...args);
            });
        }
    }
}

export default EventEmitter;