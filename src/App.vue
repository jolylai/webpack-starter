<template>
  <button @click="main">request</button>
  <a @click="onClick('/home')">home</a>
  <a @click="onClick('/about')">about</a>
</template>

<script setup>
const request = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello webpack");
    }, 1000);
  });
};

const main = async () => {
  const response = await request();

  console.log(response);
};

const onClick = () => {
  history.pushState(null, null, "/home");
  history.pushState(null, null, "/about");
};
</script>

<style>
.example {
  color: red;
}
</style>
