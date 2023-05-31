<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { SceneEnv } from '@/BabylonGB/SceneEnv';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BabylonGB',
  mounted() {
    const canvas = document.querySelector("canvas")!;
    new SceneEnv(canvas);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

html,head,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: black;
  border: none;
}
canvas {
  width: 100%;
  height: 100%;
  border: none;

}
</style>
