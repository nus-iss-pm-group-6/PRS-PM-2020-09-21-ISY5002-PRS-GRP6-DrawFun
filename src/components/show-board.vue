<template>
  <canvas-board id="show-board" ref="board" title="Generated sketch">
    <div class="row gx-3 align-items-center">
      <div class="input-group col align-items-center">
        <span class="input-group-text">Temperature: {{ Number.parseFloat(temperature).toFixed(2) }}</span>
        <div class="col ml-2">
          <input id="slider" type='range' class="form-range" min="0" max="1" step="0.01" v-model="temperature">
        </div>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" type="button" @click="next">NEXT</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-dark" type="button" @click="$emit('copy', rect)">COPY</button>
      </div>
    </div>
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
  emits: ['copy'],
  setup() {
    const board = ref(null);
    const temperature = ref(0.3);
    const rect = ref(null);
    const generator = new Generator;

    const next = () => {
      board.value.clear();
      const ctx = board.value.context;
      const canvas = ctx.canvas;
      generator.start(renderFn(
        ctx, canvas.width / 4, canvas.height / 4, false,
        async m => (rect.value = m) && await new Promise(requestAnimationFrame)
      ), temperature.value);
    };

    return {
      board, temperature, rect, generator, next,
      clear: async () => (await generator.reset()) || board.value.clear(),
      loadModel: model => board.value.clear() || generator.load(model) && next()
    };
  }
};
</script>

<style lang="scss">
#show-board .card-body {
  background-color: #f6eeef;
}
</style>

<style lang="scss" scoped>
#show-board {
  border: 1px solid lightskyblue;
}

.input-group-text {
  background: #fff;
  border: none;
}
</style>
