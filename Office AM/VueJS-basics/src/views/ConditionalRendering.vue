<template>
  <h2>conditional rendering</h2>
  <h3 v-if="num === 0">number is zero</h3>
  <h3 v-else-if="num > 0">number is positive</h3>
  <h3 v-else-if="num < 0">number is negative</h3>
  <h3 v-else>not a number</h3>
  <h1>other check</h1>
  <template v-if="display">
    <h3>Hello</h3>
    <h3>Akshay</h3>
  </template>
  <!-- using v-show -->
  <h2 v-show="showElement">Using v-show</h2>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      num: 0,
      display: true,
      showElement: true,
    };
  },
};
</script>
