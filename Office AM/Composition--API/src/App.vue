<template>
  <DataCheck />
  <DemoFifty4 />
  <br /><br />
  <DemoTwo />
  <ComponentMethods />
  <VMethods />
</template>
<script>
import DataCheck from "./components/DataCheck.vue";
import DemoFifty4 from "./components/DemoFifty4.vue";
import DemoTwo from "./components/DemoTwo.vue";
import ComponentMethods from "./components/ComponentMethods.vue";
import VMethods from "./components/VMethods.vue";
export default {
  name: "App",
  components: {
    DataCheck,
    DemoFifty4,
    DemoTwo,
    ComponentMethods,
    VMethods,
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
