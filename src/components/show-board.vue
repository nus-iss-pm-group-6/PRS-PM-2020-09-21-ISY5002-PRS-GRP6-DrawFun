<template>
  <canvas-board ref="board" title="Generated sketch">
    <label style="font-weight: bold">Temperature: {{temperature / 100}}</label>
    <ui-slider min="0" max="100" step="5" v-model="temperature"/>
    <ui-card-buttons>
      <ui-button outlined @click="next()">NEXT</ui-button>
    </ui-card-buttons>
  </canvas-board>
</template>

<script>
import { getCurrentInstance, onMounted, ref, watch } from 'vue';
import CanvasBoard from './canvas-board.vue';
import Generator from '../generator';
import renderFn from '../render';

export default {
  name: 'ShowBoard',
  components: { CanvasBoard },
  props: {
    model: Number
  },
  setup(props) {
    const board = ref(null);
    const temperature = ref(30);
    const generator = new Generator;

    watch(() => props.model, model => board.value.clear() || generator.load(model));
    onMounted(() => {
      getCurrentInstance().props.model = 26;
    });

    return {
      board, temperature, generator,
      next() {
        board.value.clear();
        const ctx = board.value.context;
        const canvas = ctx.canvas;
        let x_min = canvas.width, x_max = 0;
        let y_min = canvas.height, y_max = 0;
        generator.start(renderFn(ctx, canvas.width / 2, canvas.height / 2, async (x, y, _) => {
          await new Promise(requestAnimationFrame);
          x_min = Math.min(x_min, x), x_max = Math.max(x_max, x);
          y_min = Math.min(y_min, y), y_max = Math.max(y_max, y);
          // TODO: ensure all points in canvas
        }), temperature.value / 100);
      }
    };
  }
};
</script>
