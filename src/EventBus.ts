class EventBus {
    private static instance: EventBus;
    private events: { [key: string]: Function[] };

    private constructor() {
        this.events = {};
    }

    public static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }

    public subscribe(event: string, callback: Function): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    public unsubscribe(event: string, callback: Function): void {
        const eventCallbacks = this.events[event];
        if (eventCallbacks) {
            this.events[event] = eventCallbacks.filter(cb => cb !== callback);
        }
    }

    public call(event: string, ...args: any[]): void {
        const eventCallbacks = this.events[event];
        if (eventCallbacks) {
            eventCallbacks.forEach(callback => callback(...args));
        }
    }
}

export default EventBus;