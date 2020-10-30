import * as tf from '@tensorflow/tfjs';

tf.setBackend('cpu');
let model;
let ready = (async () => {
    await tf.ready();
    console.log(tf.getBackend());
    model = await tf.loadLayersModel('/static/models/classifier/model.json');
    model.compile({
        optimizer: 'adam',
        loss: tf.metrics.sparseCategoricalAccuracy,
        metrics: ['accuracy']
    });
    ready = undefined;
})();

addEventListener('message', async e => {
    if (!e.data) {
        return ready && await ready, model.resetStates();
    }
    console.time('classification');
    ready && await ready;
    console.timeLog('classification', 'model ready');
    const t = await model.predict(tf.tensor([e.data]));
    console.timeEnd('classification');
    postMessage(await t.array());
    t.dispose();
});
