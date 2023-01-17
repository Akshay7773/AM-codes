<template>
  <h1>This is component D</h1>
  <ComponentE />
</template>

<script>
import ComponentE from "./ComponentE.vue";
export default {
  name: "ComponentD",
  components: {
    ComponentE,
  },
};
</script>

<style lang="scss" scoped></style>
