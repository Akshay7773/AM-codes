<template>
  <h1>This is component E with username {{ username }}</h1>
</template>

<script>
export default {
  name: "ComponentE",
  inject: ["username"],
};
</script>

<style lang="scss" scoped></style>
