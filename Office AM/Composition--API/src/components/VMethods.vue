<template>
  <div>
    <input type="text" v-model="firstname" />
    <input type="text" v-model="lastName" />
    <button @click="displayObj">display</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { toRefs } from "vue";
export default {
  name: "VMethods",
  setup() {
    const state = reactive({
      firstname: "",
      lastName: "",
    });
    function displayObj() {
      console.log(state);
    }

    return {
      ...toRefs(state),
      displayObj,
    };
  },
};
</script>

<style lang="scss" scoped></style>
