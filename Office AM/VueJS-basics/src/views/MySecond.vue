<template>
  <div>hello {{ name }}</div>
  <h3
    :style="{
      color: highlightedColor,
      fontSize: size,
      padding: '20px',
    }"
  >
    Inline style
  </h3>

  <!-- using headerStyleObj -->
  <div :style="headerStyleObj">Hello headerStyleObj</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: "ak",
      highlightedColor: "green",
      size: "50px",
      headerStyleObj: {
        color: "blue",
        backgroundColor: "yellow",
      },
    };
  },
};
</script>

<style>
.element {
  background-color: rebeccapurple;
}
</style>
