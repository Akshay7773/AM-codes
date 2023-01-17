<template>
  <div>
    <div @mouseover="increamentCount">Click Counter {{ count }}</div>
  </div>
</template>

<script>
import Counter from "../mixins/counter";
export default {
  name: "HoverCounter",
  mixins: [Counter],
};
</script>

<style lang="scss" scoped></style>
