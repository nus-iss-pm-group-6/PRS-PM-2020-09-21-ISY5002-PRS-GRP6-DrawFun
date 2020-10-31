<template>
  <div class="home">
    <ui-grid class="main-grid">
      <ui-grid-cell :columns="{default: 4, desktop: 6}">
        <draw-board ref="drawBoard" v-model:predict="model" @clear="showBoard.clear()"/>
      </ui-grid-cell>
      <ui-grid-cell :columns="{default: 4, desktop: 6}">
        <show-board ref="showBoard" :model="model"/>
      </ui-grid-cell>
    </ui-grid>
  </div>
</template>

<script>
import { ref } from 'vue';
import DrawBoard from '../components/draw-board.vue';
import ShowBoard from '../components/show-board.vue';

export default {
  name: 'Home',
  components: { DrawBoard, ShowBoard },
  setup() {
    const model = ref(null);

    return {
      drawBoard: ref(null),
      showBoard: ref(null),
      model
    };
  }
};
</script>

<style lang="scss" scoped>
.main-grid {
  padding: min(2%, 12px) 4%;
  width: 100%;
  height: calc(100vh - 64px);
  box-sizing: border-box;
}
</style>
