<template>
  <div><slot>Default Content</slot></div>
</template>

<script>
export default {
  name: "CardsNew",
  data() {
    return {};
  },
  props: ["content"],
};
</script>
