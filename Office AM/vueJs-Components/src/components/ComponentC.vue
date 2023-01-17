<template>
  <h1>This is component C</h1>
  <ComponentD />
</template>

<script>
import ComponentD from "./ComponentD.vue";
export default {
  name: "ComponentC",
  components: {
    ComponentD,
  },
};
</script>

<style lang="scss" scoped></style>
