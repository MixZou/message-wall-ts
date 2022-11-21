<template>
  <div class="select-container">
    <div class="page-select">
      Page
      <select v-model="currentPage" @change="submitPage" title="Page">
        <option disabled value="">Please select page</option>
        <option v-for="n in props.pageCount">{{ n }}</option>
      </select>
    </div>
    <div class="limit-select">
      Limit
      <select v-model="currentLimit" @change="submitLimit" title="Limit">
        <option disabled value="">Please select limit</option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["pageCount"]);
const emit = defineEmits(['selectedPage','selectedLimit'])

const currentLimit = ref<number>(5);
const currentPage = ref<number>(1);

const submitPage = ()=>{
  emit('selectedPage', currentPage.value)
}
const submitLimit = ()=>{
  currentPage.value=1
  emit('selectedLimit', currentLimit.value)
}
</script>

<style scoped>
select {
  margin-left: 2px;
  margin-right: 2px;
}
.select-container {
  display: flex;
  flex-direction: row;
  width: 400px;
  height: 25px;
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 15px;
}

.page-select, .limit-select{
  width: 200px;
}

</style>
