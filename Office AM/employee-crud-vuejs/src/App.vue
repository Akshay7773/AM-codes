<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
  <!-- <h2>Candidates CRUD</h2> -->
  <router-view />
</template>
<script>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const router = useRouter();
    onMounted(() => {
      // navigate to users lists when users are presents in localstorage
      let users = JSON.parse(localStorage.getItem("users"));
      if (users) router.push("/users");
      console.log("first", users);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
