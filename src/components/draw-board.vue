<template>
  <canvas-board ref="board" title="Draw whatever you imagine">
    <div class="row gx-3 align-items-center">
      <div class="col"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="clear">CLEAN</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-dark" @click="download">DOWNLOAD</button>
      </div>
    </div>
  </canvas-board>
</template>

<script>
import { onMounted, ref } from 'vue';
import CanvasBoard from './canvas-board.vue';
import renderFn from '../render';
import Classifier from '../classifier';
import { labels } from '../models';

export default {
  name: 'DrawBoard',
  components: { CanvasBoard },
  emits: ['predict', 'clear'],
  setup(_, { emit }) {
    const board = ref(null);
    const classifier = new Classifier;
    let x, y, rect;
    let sketch;
    let render;

    const clear = () => {
      x = y = undefined;
      sketch = [];
    };

    onMounted(() => {
      const canvas = board.value.canvas;
      clear();
      setTimeout(() => board.value.clear());
      const pos = e => {
        const rect = e.target.getBoundingClientRect();
        return [e.x - rect.left, e.y - rect.top];
      };
      const begin_path = e => {
        x === undefined || y === undefined ?
          render = clear() || renderFn(board.value.context, ...([x, y] = pos(e)), false, r => rect = r) :
          path(e, 0);
        canvas.addEventListener('mousemove', on_mousemove);
      };
      const path = (e, pen) => {
        timer && clearTimeout(timer);
        const p = pos(e);
        const dx = p[0] - x, dy = p[1] - y;
        [x, y] = p;
        render(dx, dy, pen);
        sketch.push([dx, dy, pen]);
      };
      const on_mousemove = e => path(e, 0);
      let timer;
      const end_path = e => {
        canvas.removeEventListener('mousemove', on_mousemove);
        path(e, 1);
        timer && clearTimeout(timer);
        timer = setTimeout(async () => {
          timer = undefined;
          const xs = sketch.map(t => t[0]), ys = sketch.map(t => t[1]);
          const rx = Math.max(...xs) - Math.min(...xs), ry = Math.max(...ys) - Math.min(...ys);
          const pred = classifier.predict(sketch.map(([x, y, p]) => [x / rx, y / ry, p]));
          sketch = [];
          const argmax = (await pred).reduce((acc, x, i, arr) => (acc == -1 || x > arr[acc]) && labels[i] + 1 ? i : acc, -1);
          console.log(argmax, labels[argmax]);
          emit('predict', labels[argmax]);
        }, 1000);
      };
      canvas.addEventListener('mousedown', begin_path);
      canvas.addEventListener('mouseup', end_path);
      canvas.addEventListener('mouseout', e => e.buttons && end_path(e));
    });

    return {
      board,
      clear: () => clear() || board.value.clear() || classifier.reset() || emit('clear'),
      download: () => board.value.canvas.toBlob(b => window.open(URL.createObjectURL(b)).addEventListener(
        'load', e => e.target.body.style.background = '#fff'
      )),
      copy: (canvas, r) => {
        const ctx = board.value.context;
        clear();
        classifier.reset();
        ctx.clearRect(
          rect.x - ctx.lineWidth, rect.y - ctx.lineWidth,
          rect.width + ctx.lineWidth * 2, rect.height + ctx.lineWidth * 2
        );
        ctx.beginPath();
        const [w, h] = rect.width / rect.height < r.width / r.height ? [r.width, rect.height] : [rect.width, r.height];
        ctx.drawImage(canvas, r.x, r.y, r.width, r.height, rect.x, rect.y, w, h);
      }
    };
  }
};
</script>
