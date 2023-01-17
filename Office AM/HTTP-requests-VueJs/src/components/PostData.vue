<template>
  <div><h1>Post Data</h1></div>
  <form @submit.prevent="postdata">
    <div>
      <label for="userId">userId</label>
      <input type="text" id="userId" v-model="formData.userId" />
    </div>
    <div>
      <label for="title">Title</label>
      <input type="text" id="title" v-model="formData.title" />
    </div>
    <div>
      <label for="body">body</label>
      <input type="text" id="body" v-model="formData.body" />
    </div>
    <button>Submit</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "PostData",
  data() {
    return {
      formData: {
        userId: "",
        title: "",
        body: "",
      },
    };
  },
  methods: {
    postdata() {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", this.formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped></style>
