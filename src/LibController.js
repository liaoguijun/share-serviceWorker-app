import EventEmitter from './EventEmitter';

class LibController extends EventEmitter {
    constructor() {
        super();
    }

    // wsPush(...args){
    //     this.emit('wsPush', ...args)
    // }
}

const controller = new LibController();
export default controller;