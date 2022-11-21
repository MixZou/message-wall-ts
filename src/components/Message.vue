<template>
  <div class="message" :id="props.id">
    <div class="edit-container" v-if="isEdit">
      <textarea
        class="edit-content"
        placeholder="Edit Your Message"
        v-model="editContent"
      />
      <div class="buttons">
        <button class="edit" @click="confirmEditMessage">Confirm</button>
        <button class="delete" @click="change">Cancel</button>
      </div>
    </div>
    <div v-else>
      <div class="content">{{ props.content }}</div>
      <div class="time">
        {{ moment.unix(props.time).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <div class="buttons">
        <button class="edit" @click="change">Edit</button>
        <button class="delete" @click="confirmDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref } from "vue";
import { deleteMessage, updateMessage } from "../api";

moment.locale("zh-cn");

const props = defineProps(["time", "id", "content"]);
const emit = defineEmits(["test", "confirmEdit", "confirmDelete"]);

const isEdit = ref<boolean>(false);
const refresh = ref<boolean>(false);
const editContent = ref<String>("");

const change = () => {
  isEdit.value = !isEdit.value;
  editContent.value = "";
};

const confirmEditMessage = async () => {
  if (editContent.value != "") {
    await updateMessage(props.id, { content: editContent.value.toString() })
      .then()
      .catch((error: Error) => {
        console.log(`Update Error: ${error}`);
      });
    change();
  }
  refresh.value = true;
  emit("confirmEdit", refresh.value);
};

const confirmDelete = async () => {
  await deleteMessage(props.id)
    .then()
    .catch((error: Error) => {
      console.log(`Delete Error ${error}`);
    });
  refresh.value = true;
  emit("confirmDelete", refresh.value);
};
</script>

<style scoped>
.message {
  background-color: #171717;
  height: 100px;
  width: 450px;
  border-radius: 10px;
  position: relative;
  margin-bottom: 10px;
}
.content {
  color: white;
  top: 20px;
  left: 20px;
  position: absolute;
}

.edit-content {
  top: 20px;
  left: 20px;
  width: 200px;
  height: 50px;
  resize: none;
  position: absolute;
}

.time {
  left: 20px;
  bottom: 10px;
  position: absolute;
  font-size: 12px;
  color: gray;
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
  opacity: 0;
  transition: 1s ease-in-out;
}
.message:hover .buttons {
  opacity: 1;
}

.edit-container .buttons {
  opacity: 1;
}

.buttons button {
  border-radius: 5px;
  width: 60px;
  height: 20px;
  color: white;
  border: 1px;
  font-weight: bold;
}

.buttons .edit {
  background-color: teal;
}
.buttons .delete {
  background-color: red;
}
</style>
