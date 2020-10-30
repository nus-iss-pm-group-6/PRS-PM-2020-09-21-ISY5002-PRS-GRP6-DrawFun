import * as tf from '@tensorflow/tfjs';

tf.setBackend('cpu');
let model;
let ready = (async () => {
    await tf.ready();
    console.log(tf.getBackend());
    model = await tf.loadGraphModel('/static/models/classifier/model.json');
    ready = undefined;
})();

addEventListener('message', async e => {
    console.time('classification');
    ready && await ready;
    console.timeLog('classification', 'model ready');
    const t = await model.executeAsync(tf.tensor([e.data]));
    console.timeEnd('classification');
    postMessage(await t.array());
    t.dispose();
});
