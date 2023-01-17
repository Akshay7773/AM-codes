<template>
  <h2>Hello {{ msg }} and {{ heroname }}</h2>
</template>

<script>
export default {
  name: "MyFirst",
  // for props passing
  props: ["msg", "heroname"],
};
</script>
