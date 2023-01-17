<template>
  <h2>PostLists</h2>
  <!-- <button @click="getdata">Load Posts</button> -->
  <div v-for="post in posts" :key="post.id">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <hr />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "PostLists",
  created() {
    this.getdata();
  },
  data() {
    return {
      posts: [],
    };
  },

  methods: {
    getdata() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => (this.posts = res.data))
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped></style>
