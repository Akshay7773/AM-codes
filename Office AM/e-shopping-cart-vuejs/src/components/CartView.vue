<template>
  <div class="container">
    <div class="row">
      <h1>
        <a href="/">My Ecommerce Site</a>

        <span class="pull-right">
          <a href="cart.html">Cart ({{ count }})</a>
        </span>
      </h1>
      <hr />
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">MY CART (1)</div>
          <div class="panel-body">
            <form v-for="(list, index) in items" :key="index">
              <div class="row">
                <div class="col-md-3">
                  <img src="images/5.jpeg" width="100px" height="200px" />
                </div>
                <div class="col-md-3">
                  {{ list.name }} <br /><i class="fa fa-inr"></i
                  >{{ list.prize }}
                </div>
                <div class="col-md-3">
                  quantity
                  <br />
                  <button
                    type="button"
                    @click="decquantity(index)"
                    class="qtyminus"
                    ng-disabled="qty<=0"
                  >
                    -
                  </button>
                  <input
                    v-model="list.count"
                    type="text"
                    name="quantity"
                    class="qty"
                    size="5px"
                  />
                  <button type="button" @click="incquantity(index)">+</button>
                </div>
                <div class="col-md-3">
                  <a @click="removeEle(index)" class="btn btn-warning"
                    >remove</a
                  >
                </div>
              </div>
              <hr />
            </form>
            <hr />
            <div class="row">
              <div class="col-md-9">
                <label class="pull-right">Amount Payable </label>
              </div>
              <div class="col-md-3">{{ hello(items) }}</div>
            </div>
          </div>
          <div class="panel-footer">
            <a @click="gotohome()" class="btn btn-success">Continue Shopping</a>
            <a @click="placeorder()" class="pull-right btn btn-danger"
              >Place Order</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    console.log("first");
    let count = ref(0);
    let items = ref([]);
    const router = useRouter();
    function gotohome() {
      router.push("/home");
      //   console.log("first");
    }
    onMounted(() => {
      console.log("first");
      let cartValues = JSON.parse(localStorage.getItem("cart"));
      if (cartValues === null) {
        count.value = 0;
      } else {
        count.value = cartValues.length;
      }
      items.value = cartValues;
      console.log(items);
    });
    return {
      gotohome,
      items,
      count,
    };
  },
  methods: {
    hello(list) {
      console.log(list);
      const sum = list.reduce((accumulator, object) => {
        return accumulator + object.prize * object.count;
      }, 0);
      return sum;
    },
    placeorder() {
      // console.log(this.items);
      this.$router.push("/confirmOrder");
    },
    incquantity(id) {
      // console.log(id);
      let a = this.items;
      a[id].count = a[id].count + 1;
      console.log(a);
    },
    decquantity(id) {
      let a = this.items;
      if (a[id].count == 1) {
        return;
      }
      a[id].count = a[id].count - 1;
      console.log(a);
    },
    removeEle(index) {
      // console.log(index);
      this.items.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
  },
};
</script>

<style lang="scss" scoped></style>
