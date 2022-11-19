<template>
  <button class="publish" @click="publishMessage">Publish</button>
</template>

<script setup lang='ts'>
import {defineEmits} from 'vue'
const emit = defineEmits(['toCreateMessage'])

const publishMessage = ()=>{
  emit('toCreateMessage')
}
</script>

<style scoped>
.publish {
  position: fixed;
  right: 20px;
  bottom: 10px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: teal;
  color: white;
  font-weight: bold;
  border: 1px white;
  z-index: 10;
}
</style>