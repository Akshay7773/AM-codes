<template>
  <div>
    <h2>This is Popup Component</h2>
    <h2>Hello Popup</h2>
    <input type="text" v-model="name" />
    <button @click="$emit('close', name)">Close Popup</button>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  emits: ["close"],
  data() {
    return {
      name: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
