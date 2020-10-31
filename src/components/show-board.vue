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
import { ref } from 'vue';
import CanvasBoard from './canvas-board.vue';
import Generator from '../generator';
import renderFn from '../render';

export default {
  name: 'ShowBoard',
  components: { CanvasBoard },
  setup() {
    const board = ref(null);
    const temperature = ref(30);
    const generator = new Generator;

    const next = () => {
      board.value.clear();
      const ctx = board.value.context;
      const canvas = ctx.canvas;
      generator.start(renderFn(
        ctx, canvas.width / 4, canvas.height / 4, false,
        async () => await new Promise(requestAnimationFrame)
      ), temperature.value / 100);
    };

    return {
      board, temperature, generator, next,
      clear: async () => (await generator.reset()) || board.value.clear(),
      loadModel: model => board.value.clear() || generator.load(model) && next()
    };
  }
};
</script>
