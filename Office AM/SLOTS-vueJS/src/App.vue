<template>
  <h2>hello</h2>
  <CardsNew></CardsNew>
  <!--above our default content inside slot tag is displayed  -->
  <CardsNew>Card Content 1</CardsNew>

  <CardsNew><h2>Card Content 2</h2></CardsNew>
  <CardsNew>
    <img
      src="https://i.picsum.photos/id/824/200/200.jpg?hmac=Uozb__ejlYDEziPN80UpSs6tvyqjiIyjnWYj9gaPP-Y"
  /></CardsNew>

  <br /><br />
  <h1>named slots</h1>
  <NamedSlots class="namedSlots">
    <template v-slot:header>Header</template>
    <template v-slot:default>
      <img
        src="https://i.picsum.photos/id/824/200/200.jpg?hmac=Uozb__ejlYDEziPN80UpSs6tvyqjiIyjnWYj9gaPP-Y"
    /></template>
    <template v-slot:footer>
      <h2><button>Footer</button></h2>
    </template>
  </NamedSlots>

  <br /><br />
  <h1>Name List || Slot props</h1>
  <NameList>
    <template v-slot:default="slotProps"
      >{{ slotProps.firstname }} {{ slotProps.lastname }}</template
    >
  </NameList>
</template>
<script>
import CardsNew from "./components/CardsNew.vue";
import NamedSlots from "./components/NamedSlots.vue";
import NameList from "./components/NameList.vue";
export default {
  name: "App",

  components: {
    CardsNew,
    NamedSlots,
    NameList,
  },
};
</script>

<style scoped>
.namedSlots {
  /* background-color: red; */
  border: 1px solid black;
}
</style>
