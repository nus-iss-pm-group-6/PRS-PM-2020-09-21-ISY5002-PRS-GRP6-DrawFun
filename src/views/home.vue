<template>
  <div class="home row">
    <div class="col-lg-6 col-md-4">
      <draw-board ref="drawBoard" @predict="showBoard.loadModel($event)" @clear="showBoard.clear()"/>
    </div>
    <div class="col-lg-6 col-md-4">
      <show-board ref="showBoard" :model="model" @copy="drawBoard.copy(showBoard.board.canvas, $event)"/>
    </div>
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
.home {
  padding: min(2%, 12px) 4%;
  width: 100%;
  height: calc(100vh - 100px);
  box-sizing: border-box;
}
</style>
