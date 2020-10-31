<template>
  <ui-card class="canvas-board">
    <div :class="[$tt('subtitle1'), 'canvas-board-heading']">
      {{ title }}
    </div>
    <ui-list-divider/>
    <canvas ref="canvas" :width="width" :height="height"/>
    <ui-list-divider/>
    <ui-card-actions class="canvas-board-actions"><slot/></ui-card-actions>
  </ui-card>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'CanvasBoard',
  props: {
    title: String
  },
  setup() {
    const canvas = ref(null);
    const context = ref(null);
    const width = ref(null);
    const height = ref(null);

    const clear = () => {
      const ctx = context.value;
      ctx.clearRect(0, 0, width.value, height.value);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.imageSmoothingEnabled = false;
      ctx.beginPath();
    };

    onMounted(() => {
      context.value = canvas.value.getContext('2d');
      (async () => {
        width.value = canvas.value.offsetWidth;
        height.value = canvas.value.offsetHeight;
        clear();
      })();
    });
    return {
      canvas, context, width, height, clear
    };
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/style/color' as color;

canvas {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.canvas-board {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.canvas-board-heading {
  color: color.$deep-purple-800;
  background: color.$grey-100;
  padding: 8px 16px;
  text-align: start;
  font-weight: bold;
}

.canvas-board-actions {
  min-height: 64px;
}
</style>
