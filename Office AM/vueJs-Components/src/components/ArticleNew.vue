<template>
  <h1>Prop type and Validation</h1>
  <h3>Title -{{ title }} Likes- {{ likes }}</h3>
  <div v-for="list in lists" :key="list">{{ list }}</div>
  <ComponentC />
</template>

<script>
import ComponentC from "./ComponentC.vue";
export default {
  name: "ArticleNew",
  props: {
    title: {
      type: String,
      required: true, //validation part
      default: "Article Default title",
    },
    likes: Number,
    lists: Array,
  },
  components: {
    ComponentC,
  },
};
</script>

<style lang="scss" scoped></style>
