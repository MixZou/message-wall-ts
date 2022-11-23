<template>
  <div class="container">
    <h1>Mssage Wall</h1>
    <Search @submitSearch="submitSearch" @resetList="resetList"></Search>
    <SelectPages
      @selectedPage="selectedPage"
      @selectedLimit="selectedLimit"
      :page-count="pagesCount"
    ></SelectPages>
    <CreateMessage
      v-if="isEdit"
      @closeEdit="closeEdit"
      @submitMessage="submitMessage"
    ></CreateMessage>
    <Message
      v-for="item in posts"
      :key="item.post_id"
      :content="item.content"
      :time="item.publish_time"
      :id="item.post_id"
      @confirmEdit="confirmEdit"
      @confirmDelete="confirmDelete"
    ></Message>
    <Publish @toCreateMessage="toCreateMessage"></Publish>
  </div>
</template>

<script setup lang="ts">
import Message from "../components/Message.vue";
import { MessageInterface } from "../interface/MessageInterface";
import { getMessageList, getSearchMessage } from "../api";
import Search from "../components/Search.vue";
import { reactive, onBeforeMount, onMounted, onBeforeUpdate, ref } from "vue";
import { AxiosResponse } from "axios";
import Publish from "../components/Publish.vue";
import CreateMessage from "../components/CeateMessage.vue";
import SelectPages from "../components/SelectPages.vue";

const posts = reactive<MessageInterface>([]);
const isEdit = ref<boolean>(false);

const currentLimit = ref<number>(10);
const pagesCount = ref<number>(1);
const currentPage = ref<number>(1);

onBeforeMount(() => {
  initPage();
  getPosts();
});

const initPage = async () => {
  await getMessageList()
    .then((res: AxiosResponse) => {
      let amount: number = res.data.amount;
      pagesCount.value = Math.ceil(amount / currentLimit.value);
    })
    .catch((error: Error) => {
      console.log(`Init Pages Error: ${error}`);
    });
};

const getPosts = async () => {
  let tmp: MessageInterface = [];
  await getMessageList()
    .then((res: AxiosResponse) => {
      tmp = res.data.results;
      for (let i = 0; i < tmp.length; i++) {
        posts[i] = tmp[i];
      }
    })
    .catch((error: Error) => {
      console.log(`getList Error: ${error}`);
    });
};

const getPostsByPL = async (page: number, limit: number) => {
  let tmp: MessageInterface = [];
  await getMessageList({ page, limit })
    .then((res: AxiosResponse) => {
      tmp = res.data.results;
      posts.splice(0, posts.length + 1);
      for (let i = 0; i < tmp.length; i++) {
        posts[i] = tmp[i];
      }
    })
    .catch((error: Error) => {
      console.log(`getList Error: ${error}`);
    });
};

const selectedPage = (slectedP: number) => {
  currentPage.value = slectedP;
  getPostsByPL(currentPage.value, currentLimit.value);
};

const selectedLimit = (slectL: number) => {
  initPage();
  currentLimit.value = slectL;
  currentPage.value = 1;
  getPostsByPL(currentPage.value, currentLimit.value);
};

const confirmEdit = async (refresh: boolean) => {
  if (refresh === true) {
    await getPostsByPL(currentPage.value, currentLimit.value);
  }
};

const confirmDelete = async (refresh: boolean) => {
  if (refresh === true) {
    currentPage.value = 1;
    await getPostsByPL(currentPage.value, currentLimit.value);
  }
};

const resetList = (keywords: string) => {
  submitSearch(keywords);
};

const submitSearch = async (keywords: string) => {
  if (keywords === "") {
    await getPosts();
  } else {
    let tmp: MessageInterface = [];
    await getSearchMessage(keywords)
      .then((res: AxiosResponse) => {
        tmp = res.data.results;
        posts.splice(0, posts.length + 1);
        for (let i = 0; i < tmp.length; i++) {
          posts[i] = tmp[i];
        }
        pagesCount.value = Math.ceil(posts.length / currentLimit.value);
      })
      .catch((error: Error) => {
        console.log(`Search Error: ${error}`);
      });
  }
};

const toCreateMessage = () => {
  isEdit.value = true;
};

const closeEdit = () => {
  isEdit.value = false;
};

const submitMessage = () => {
  isEdit.value = false;
  currentPage.value = 1;
  getPostsByPL(currentPage.value, currentLimit.value);
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
