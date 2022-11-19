<template>
  <div class="edit-container">
    <textarea
      class="content"
      v-model="draft"
      placeholder="Enter Your Message"
    />
    <div class="buttons">
      <button class="submit" @click="submitM">Submit</button>
      <button class="cancel" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

import { createMessage } from "../api";

const draft = ref<string>("");
const emit = defineEmits(["closeEdit", "submitMessage"]);
const cancel = () => {
  draft.value = "";
  emit("closeEdit");
};
const submitM = async () => {
  await createMessage({ content: draft.value })
    .then()
    .catch((error: Error) => {
      console.log(`Create Error: ${error}`);
    });
  emit('submitMessage')
};
</script>

<style scoped>
.edit-container {
  height: 120px;
  width: 450px;
  background-color: #171717;
  position: relative;
  margin-bottom: 10px;
  border-radius: 5px;
}

.content {
  top: 30px;
  left: 20px;
  width: 300px;
  height: 50px;
  position: absolute;
  resize: none;
}

.buttons {
  display: flex;
  gap: 5px;
  border-radius: 5px;
  color: white;
  border: 1px;
  position: absolute;
  right: 10px;
  bottom: 8px;
}

.buttons button {
  border-radius: 5px;
  width: 60px;
  height: 20px;
  color: white;
  border: 1px;
  font-weight: bold;
}

.buttons .submit {
  background-color: teal;
}
.buttons .cancel {
  background-color: red;
}
</style>
