<template>
  <div>
    <h1>Composition API</h1>
    <h3>with options {{ o_firstname }}</h3>
    <h3>With Composition API:-{{ c_firstname }}</h3>
    <h3>with Reactive - {{ greet }}</h3>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "DataCheck",
  setup() {
    const c_firstname = ref("Akshay Gawade");
    console.log("c_firstname:=", c_firstname);
    // use of reactive
    const state = reactive({
      r_firstname: "Akshay",
      r_lastname: "Gawade",
      r_designation: "Software Developer",
    });
    const greet = `Hello ${state.r_firstname} lastname is ${state.r_lastname} and designation is ${state.r_designation}`;
    return {
      c_firstname,
      greet,
    };
  },

  data() {
    return {
      o_firstname: "Akshay",
    };
  },
};
</script>

<style lang="scss" scoped></style>
