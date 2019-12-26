'use strict';




class EventEmitter {
    constructor() {
        this.listeners = {}
    }

    on(type, fn) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }

        this.listeners[type].push(fn)
    }

    emit(type, ...args) {
        if (this.listeners[type]) {
            this.listeners[type].forEach(fn => fn(...args))
        } else {
            console.warn(`please on '${type}' type first`)
        }
    }

    off(type) {
        if (this.listeners[type]) {
            delete this.listeners[type]
        }
    }


}

const event = new EventEmitter();
event.on('click', (a, b) => {
    console.log(a, b)
})
event.emit('click', 1, 2)

event.off('click')

event.emit('click', 1, 2)

module.exports = EventEmitter;