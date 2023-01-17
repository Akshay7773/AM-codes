<template>
  <br /><br />
  <h2>replacing methods in Component API</h2>
  <h3>{{ name }}</h3>
  <button @click="name = 'Jayraj'">Change name</button><br />
  <br />
  <button @click="increamentCount">Count: {{ count }}</button>
  <br />
  <h4>for reactive</h4>
  <h4>{{ firstname }} {{ lastname }}</h4>
  <button @click="changeName">change name</button>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
export default {
  name: "ComponentMethods",

  setup() {
    // this is for ref
    const count = ref(0);
    function increamentCount() {
      return (count.value += 1);
    }
    // for reactive
    const state = reactive({
      firstname: "Ak",
      lastname: "Gawade",
    });

    function changeName() {
      state.firstname = "Rahul";
      state.lastname = "Raj";
    }
    return {
      count,
      increamentCount,
      changeName,
      ...toRefs(state),
    };
  },
  data() {
    return {
      name: "Akshay",
    };
  },
};
</script>

<style lang="scss" scoped></style>
