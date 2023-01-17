<template>
  <input type="text" v-model="fname" />
  <input type="text" v-model="lname" />
  <div>fullname is {{ fullname }}</div>

  <br />
  <h2>using component API ref</h2>
  <input type="text" v-model="refFirst" />
  <input type="text" v-model="refLast" />
  <div>fullname using ref component API {{ refFullname }}</div>
  <br />
  <br />
  <h2>UKsing component API reactive</h2>
  <input type="text" v-model="reactiveFname" />
  <input type="text" v-model="reactiveLname" />
  <div>fullname using reactive component API {{ reactiveFullName }}</div>
</template>

<script>
import { ref, computed, reactive, toRefs } from "vue";

export default {
  name: "NormalComputed",
  setup() {
    const refFirst = ref("");
    const refLast = ref("");
    const refFullname = computed(function () {
      return `${refFirst.value} ${refLast.value}`;
    });

    const reactiveFullName = computed(function () {
      return `${state.reactiveFname} ${state.reactiveLname}`;
    });
    // using reactive
    const state = reactive({
      reactiveFname: "",
      reactiveLname: "",
    });

    return {
      refFirst,
      refLast,
      refFullname,
      ...toRefs(state),
      reactiveFullName,
    };
  },
  data() {
    return {
      fname: "Akshay",
      lname: "Gawade",
    };
  },
  computed: {
    fullname() {
      return `${this.fname} ${this.lname}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
