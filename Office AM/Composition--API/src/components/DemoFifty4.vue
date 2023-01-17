<template>
  <div>
    <br />
    <br />
    <h2>timeout</h2>
    <h3>{{ name }}</h3>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "DemoFifty4",
  setup() {
    // to change name after some time we need to get it in ref
    let name = ref("Vishwas");
    setTimeout(() => {
      name.value = "Akshay";
      console.log(name);
    }, 2000);
    return {
      name,
    };
  },
};
</script>

<style lang="scss" scoped></style>
