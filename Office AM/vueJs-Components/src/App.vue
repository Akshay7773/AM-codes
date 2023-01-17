<template>
  <!-- <h1>Hello</h1> -->
  <!-- props passing -->
  <!-- <MyFirst msg="hellow world" heroname="A" />
  <MyFirst msg="hellow India" heroname="B" />
  <MyFirst msg="hii" heroname="C" /> -->
  <!-- pssing through -->
  <!-- <MyFirst :msg="name" :heroname="channel" /> -->

  <h2>App Component with username : {{ name }}</h2>

  <!-- here we used :for data t
  <h1>This is app component with username: {{ username }}</h1>
  ype of likes and same as for boolean -->
  <ArticleNew title="Article Title" :likes="50" :lists="list" />
  <button @click="showPopup = true">Show Popup</button>
  <PopUp v-show="showPopup" @close="closepopup" /><br /><br />
  <InputThirty6 v-model="firstname" />
  <button @click="displayname">Submit</button>
</template>

<script>
// import MyFirst from "./components/MyFirst.vue";
import ArticleNew from "./components/ArticleNew.vue";
import PopUp from "./components/PopUp.vue";
import InputThirty6 from "./components/InputThirty6.vue";
export default {
  name: "App",
  components: {
    // MyFirst,
    ArticleNew,
    PopUp,
    InputThirty6,
  },
  data() {
    return {
      name: "Akshay Gawade",
      // channel: "CodeEvolution",
      // list: ["Akshay", "Saurabh", "Tejas", "Arnav"],
      showPopup: false,
      firstname: "",
    };
  },
  // provide: {
  //   username: "Akshay Gawade",
  // },
  provide() {
    return {
      username: this.name,
    };
  },
  methods: {
    closepopup(name) {
      (this.showPopup = false), console.log("name=", name);
    },
    displayname() {
      console.log(this.firstname);
    },
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
