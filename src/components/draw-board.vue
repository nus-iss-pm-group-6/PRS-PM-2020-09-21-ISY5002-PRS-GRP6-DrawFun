<template>
  <canvas-board ref="board" title="Draw whatever you imagine">
    <ui-card-buttons ref="buttons">
      <ui-button outlined @click="clear">CLEAN</ui-button>
      <ui-button raised>DOWNLOAD</ui-button>
    </ui-card-buttons>
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
  emits: ['update:predict', 'clear'],
  setup(_, { emit }) {
    const board = ref(null);
    const buttons = ref(null);
    const classifier = new Classifier;
    let x, y;
    let sketch;
    let render;

    const clear = () => {
      x = y = undefined;
      sketch = [];
      board.value.clear();
    };

    onMounted(() => {
      buttons.value.$el.parentElement.style.flexDirection = 'row-reverse';
      const canvas = board.value.canvas;
      clear();
      const pos = e => {
        const rect = e.target.getBoundingClientRect();
        return [e.x - rect.left, e.y - rect.top];
      };
      const begin_path = e => {
        x === undefined || y === undefined ?
          render = clear() || renderFn(board.value.context, ...([x, y] = pos(e))) :
          path(e, 0);
        canvas.addEventListener('mousemove', on_mousemove);
      };
      const path = (e, pen) => {
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
          const pred = await classifier.predict(sketch.map(([x, y, p]) => [x / rx, y / ry, p]));
          const argmax = pred.reduce((acc, x, i, arr) => (acc == -1 || x > arr[acc]) && labels[i] + 1 ? i : acc, -1);
          console.log(argmax, labels[argmax]);
          emit('update:predict', labels[argmax]);
        }, 1200);
      };
      canvas.addEventListener('mousedown', begin_path);
      canvas.addEventListener('mouseup', end_path);
      canvas.addEventListener('mouseout', e => e.buttons && end_path(e));
    });

    return {
      board, buttons,
      clear: () => clear() || classifier.reset() || emit('clear')
    };
  }
};
</script>
