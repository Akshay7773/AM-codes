<template>
  <div>hello {{ name }}</div>
  <div v-text="channel"></div>
  <div v-html="channel"></div>
  <div v-html="hack"></div>
  <!-- using id:- to set the id -->
  <h2 v-bind:id="headingId">Heading</h2>
  <!-- for disability of button  -->
  <button v-bind:disabled="isDisabled">Bind</button>

  <!-- for use of classname -->
  <h2 class="underline">Underlined text</h2>

  <!-- dynamic class changing. Status apply to this tag, if we also write class=underline here then both the classes were apply -->
  <h3 v-bind:class="status">Status</h3>

  <!-- /* conditional class apply */ -->
  <h1 v-bind:class="isPromoted && 'colorchange'">Promoted</h1>

  <!-- ternary operator -->
  <h3 v-bind:class="isSoldOut ? 'sold-out' : 'not-soldout'">Sold out</h3>
  <h3 v-bind:class="['colorchange', 'not-soldout']">
    apply array of classnames
  </h3>

  <!-- new way -->
  <div
    v-bind:class="[
      isPromoted && 'colorchange',
      isSoldOut ? 'sold-out' : 'not-soldout',
    ]"
  >
    hello div
  </div>

  <!-- conditionally applying classes -->
  <h3
    v-bind:class="{
      colorchange: isPromoted,
      underline: isSoldOut,
    }"
  >
    Conditionl Classes applying
  </h3>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      name: "AKSHAY",
      channel: "<b>Code evoluation</b>",
      hack: `<a href="#" onclick="alert('you have been hacked !')">Win a Prize!!</a>`,
      // used to set the id to any element
      headingId: "heading",
      // button disabled
      isDisabled: true,

      //dynamic class changing
      status: "success",

      // conditional class apply
      isPromoted: false,

      // ternary operator
      isSoldOut: true,
    };
  },
};
</script>

<style>
.underline {
  text-decoration: underline;
}

/* conditional class apply */

.colorchange {
  /* background-color: red; */
  font-style: italic;
}

.not-soldout {
  background-color: yellow;
}

.sold-out {
  background-color: blue;
}
</style>
