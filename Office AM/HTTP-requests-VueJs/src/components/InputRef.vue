<template>
  <div>focus on input after page gets loaded</div>
  <input type="text" ref="inputRef" />
</template>

<script>
export default {
  name: "InputRef",
  mounted() {
    this.$refs.inputRef.focus();
  },
};
</script>

<style lang="scss" scoped></style>
