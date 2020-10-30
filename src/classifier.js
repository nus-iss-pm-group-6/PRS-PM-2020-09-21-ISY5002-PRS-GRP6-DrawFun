export default class Classifier {
    constructor() {
        this._worker = new Worker('./classifier.worker.js', { type: 'module' });
        this._worker.addEventListener('messageerror', e => console.error(e));
        this._executors = [];
        const notify = e => {
            const [resolve, reject] = this._executors.shift();
            'message' === e.type ? resolve(e.data[0]) : reject(e.error);
        };
        this._worker.addEventListener('message', notify);
        this._worker.addEventListener('error', notify);
    }

    predict(sketch) {
        return new Promise((resolve, reject) => {
            this._executors.push([resolve, reject]);
            this._worker.postMessage(sketch);
        });
    }
}
