<template>
  <div class="card">
    <div class="card-header px-3 py-2">
      {{ title }}
    </div>
    <div class="card-body">
      <canvas ref="canvas" :width="width" :height="height"/>
    </div>
    <div class="card-footer"><slot/></div>
  </div>
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
canvas {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.card {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.card-header {
  text-align: start;
  font-weight: bold;
}

.card-footer {
  background-color: #ffffff;
}
</style>
