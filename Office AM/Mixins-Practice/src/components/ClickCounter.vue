<template>
  <div>
    <button @click="increamentCount">Click Counter {{ count }}</button>
  </div>
</template>

<script>
import Counter from "../mixins/counter";
export default {
  name: "ClickCounter",
  //   data() {
  //     return {
  //       count: 100,
  //     };
  //   },
  mixins: [Counter],
};
</script>

<style lang="scss" scoped></style>
