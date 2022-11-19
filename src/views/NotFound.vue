<template>
  <div class="container">

    <h1 >Sorry</h1>
    <p >We couldn't find that page</p>
    <div >
      <span class="mention">
        Try searching or go to
        <router-link :to="{ name: 'Home' }" class="to-home"
        >Home Page</router-link
        >
      </span>

    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: aliceblue;
}
.mention{
  text-align: center;
}
img{
  width: 200px;
  margin: auto;
}
.to-home{
  color: teal;
  font-weight: bold;
  text-decoration: none;
}
</style>