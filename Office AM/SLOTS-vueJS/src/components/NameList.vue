<template>
  <h3 v-for="name in names" :key="name.firstname">
    <slot :firstname="name.firstname" :lastname="name.lastname"></slot>
  </h3>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      names: [
        {
          firstname: "Akshay",
          lastname: "Gawade",
        },
        {
          firstname: "Rahul",
          lastname: "Naik",
        },
        {
          firstname: "Jayraj",
          lastname: "Shinde",
        },
        {
          firstname: "Rohit",
          lastname: "Hongekar",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
