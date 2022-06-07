<template>
  <button @click="main">request</button>
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
</script>

<style>
.example {
  color: red;
}
</style>
