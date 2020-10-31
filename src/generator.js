import { models } from './models';
import * as megenta from './3rdparty/magenta-sketch';

export default class Generator {
    async load(idx) {
        this._done && await this._done;
        if (idx < 0 || idx > models.length) {
            throw Error('model not found!');
        }
        this._model = new megenta.SketchRNN(`/static/models/sketchrnn/${models[idx]}.gen.json`);
        this._point = this._model.zeroInput();
        await (this._ready = this._model.initialize());
    }

    async start(callback, temperature = 0.3) {
        await this._ready;
        await this.reset();
        const done = (async () => {
            for (; this._point && !this._point[4];) {
                this._state = this._model.update(this._point, this._state);
                this._point = this._model.sample(this._model.getPDF(this._state, temperature));
                await callback(...this._point.slice(0, 2), +!this._point[2]);
            }
            this._done = undefined;
        })();
        this._done = Promise.allSettled([done]);
        return done;
    }

    async reset() {
        if (!this._point) {
            return;
        }
        this._point = undefined;
        this._state = this._model.zeroState();
        this._done && await this._done;
        this._point = this._model.zeroInput();
    }
}
