<template>
  <div class="search-container">
    <input type="text" placeholder="Search" v-model="keywords" />
    <button @click="submitS">Search</button>
    <button @click="clear">Reset</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["submitSearch", "resetList"]);
const keywords = ref("");

const clear = () => {
  keywords.value = "";
  emit("resetList", keywords.value);
};

const submitS = async () => {
  emit("submitSearch", keywords.value);
};
</script>

<style scoped>
.search-container {
  height: 25px;
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>