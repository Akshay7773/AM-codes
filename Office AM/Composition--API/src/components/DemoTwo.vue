<template>
  <div>{{ firstname }} {{ lastname }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "DemoTwo",
  setup() {
    const state = reactive({
      firstname: "Jayraj",
      lastname: "Shinde",
    });
    setTimeout(() => {
      state.firstname = "Akshay";
      state.lastname = "Gawade";
    }, 2000);
    return toRefs(state);
  },
};
</script>

<style lang="scss" scoped></style>
