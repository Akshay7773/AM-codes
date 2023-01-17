<template>
  <!-- <p>{{ $store.state.firstName }} {{ $store.state.lastName }}</p> -->
  <div class="container">
    <h1>
      <a href="/">My Ecommerce Site</a>
      <span class="pull-right">
        <a @click="gotocart()">Cart ({{ count }})</a>
      </span>
    </h1>
    <hr />
    <div class="row">
      <div class="col-md-3" v-for="(a, index) in arr" :key="index">
        <div :class="getclass(index)">
          <img :src="`${a.image}`" width="250" height="200" />
          <br /><br />
          <p>{{ a.name }}</p>
          <p><i class="fa fa-inr"></i>{{ a.prize }}</p>
          <a @click="addtocart(a)" class="btn btn-warning">Add to Cart</a>
        </div>
        <hr />
      </div>
    </div>
    <hr />
  </div>
  <!-- <router-view /> -->
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    let cart = [];
    let count = ref(0);
    const arr = [
      {
        id: 0,
        name: "First",
        image:
          "https://images.dog.ceo/breeds/mix/Sydney_Aussiedoodle_11_weeks_sml.jpg",
        prize: 350,
      },
      {
        id: 1,
        name: "Second",
        image:
          "http://api.page2images.com/directlink?p2i_url=http://www.google.com&p2i_key=YOUR_API_KEY",
        prize: 550,
      },
      {
        id: 2,
        name: "Third",
        image:
          "https://i.picsum.photos/id/282/200/300.jpg?hmac=CVnHWoW4uSir_3zYiJzNPVs8XMSyf968WjkWvPlwu3g",
        prize: 200,
      },
      {
        id: 3,
        name: "Fourth",
        image:
          "https://i.picsum.photos/id/1059/200/200.jpg?hmac=2w4ZTAuYGsSUL-ur3iVQO04H8398XxIaeLEGVBNRSLU",
        prize: 700,
      },
      {
        id: 4,
        name: "Fifth",
        image:
          "https://i.picsum.photos/id/1071/200/200.jpg?hmac=mb6el6MCnRCyFnuMcCPJppn1WISnV5OKFUqDFg82Joo",
        prize: 120,
      },
      {
        id: 5,
        name: "Sixth",
        image:
          "https://images.dog.ceo/breeds/mix/Sydney_Aussiedoodle_11_weeks_sml.jpg",
        prize: 350,
      },
      {
        id: 6,

        name: "Fifth",
        image:
          "https://i.picsum.photos/id/1071/200/200.jpg?hmac=mb6el6MCnRCyFnuMcCPJppn1WISnV5OKFUqDFg82Joo",
        prize: 120,
      },
      {
        id: 7,

        name: "Fourth",
        image:
          "https://i.picsum.photos/id/1059/200/200.jpg?hmac=2w4ZTAuYGsSUL-ur3iVQO04H8398XxIaeLEGVBNRSLU",
        prize: 700,
      },
      {
        id: 8,
        name: "Second",
        image:
          "http://api.page2images.com/directlink?p2i_url=http://www.google.com&p2i_key=YOUR_API_KEY",
        prize: 550,
      },
      {
        id: 9,
        name: "First",
        image:
          "https://images.dog.ceo/breeds/mix/Sydney_Aussiedoodle_11_weeks_sml.jpg",
        prize: 350,
      },
      {
        id: 10,
        name: "Fifth",
        image:
          "https://i.picsum.photos/id/1071/200/200.jpg?hmac=mb6el6MCnRCyFnuMcCPJppn1WISnV5OKFUqDFg82Joo",
        prize: 120,
      },
      {
        id: 11,
        name: "Third",
        image:
          "https://i.picsum.photos/id/282/200/300.jpg?hmac=CVnHWoW4uSir_3zYiJzNPVs8XMSyf968WjkWvPlwu3g",
        prize: 200,
      },
      {
        id: 12,
        name: "First",
        image:
          "https://images.dog.ceo/breeds/mix/Sydney_Aussiedoodle_11_weeks_sml.jpg",
        prize: 350,
      },
      {
        id: 13,
        name: "Fifth",
        image:
          "https://i.picsum.photos/id/1071/200/200.jpg?hmac=mb6el6MCnRCyFnuMcCPJppn1WISnV5OKFUqDFg82Joo",
        prize: 120,
      },
      {
        id: 14,
        name: "First",
        image:
          "https://images.dog.ceo/breeds/mix/Sydney_Aussiedoodle_11_weeks_sml.jpg",
        prize: 350,
      },
      {
        id: 15,
        name: "Fifth",
        image:
          "https://i.picsum.photos/id/1071/200/200.jpg?hmac=mb6el6MCnRCyFnuMcCPJppn1WISnV5OKFUqDFg82Joo",
        prize: 120,
      },
      {
        id: 16,
        name: "Fourth",
        image:
          "https://i.picsum.photos/id/1059/200/200.jpg?hmac=2w4ZTAuYGsSUL-ur3iVQO04H8398XxIaeLEGVBNRSLU",
        prize: 700,
      },
      {
        id: 17,
        name: "Fourth",
        image:
          "https://i.picsum.photos/id/1059/200/200.jpg?hmac=2w4ZTAuYGsSUL-ur3iVQO04H8398XxIaeLEGVBNRSLU",
        prize: 700,
      },
      {
        id: 18,
        name: "Second",
        image:
          "http://api.page2images.com/directlink?p2i_url=http://www.google.com&p2i_key=YOUR_API_KEY",
        prize: 550,
      },
      {
        id: 19,
        name: "Fourth",
        image:
          "https://i.picsum.photos/id/1059/200/200.jpg?hmac=2w4ZTAuYGsSUL-ur3iVQO04H8398XxIaeLEGVBNRSLU",
        prize: 700,
      },
      {
        id: 20,
        name: "First",
        image:
          "https://images.dog.ceo/breeds/mix/Sydney_Aussiedoodle_11_weeks_sml.jpg",
        prize: 350,
      },
      {
        id: 21,
        name: "Second",
        image:
          "http://api.page2images.com/directlink?p2i_url=http://www.google.com&p2i_key=YOUR_API_KEY",
        prize: 550,
      },
      {
        id: 22,
        name: "Fourth",
        image:
          "https://i.picsum.photos/id/1059/200/200.jpg?hmac=2w4ZTAuYGsSUL-ur3iVQO04H8398XxIaeLEGVBNRSLU",
        prize: 700,
      },
      {
        id: 23,
        name: "Fourth",
        image:
          "https://i.picsum.photos/id/1059/200/200.jpg?hmac=2w4ZTAuYGsSUL-ur3iVQO04H8398XxIaeLEGVBNRSLU",
        prize: 700,
      },
      {
        id: 24,
        name: "First",
        image:
          "https://images.dog.ceo/breeds/mix/Sydney_Aussiedoodle_11_weeks_sml.jpg",
        prize: 350,
      },
      {
        id: 25,
        name: "Fifth",
        image:
          "https://i.picsum.photos/id/1071/200/200.jpg?hmac=mb6el6MCnRCyFnuMcCPJppn1WISnV5OKFUqDFg82Joo",
        prize: 120,
      },
      {
        id: 26,
        name: "Fourth",
        image:
          "https://i.picsum.photos/id/1059/200/200.jpg?hmac=2w4ZTAuYGsSUL-ur3iVQO04H8398XxIaeLEGVBNRSLU",
        prize: 700,
      },
      {
        id: 27,
        name: "Fifth",
        image:
          "https://i.picsum.photos/id/1071/200/200.jpg?hmac=mb6el6MCnRCyFnuMcCPJppn1WISnV5OKFUqDFg82Joo",
        prize: 120,
      },
    ];
    onMounted(() => {
      //   console.log(arr);
      let mainArr = JSON.parse(localStorage.getItem("cart"));
      console.log(mainArr);
      if (mainArr === null) {
        count.value = 0;
      } else {
        count.value = mainArr.length;
      }
      console.log(count);
    });
    function getclass(index) {
      return index % 4 === 0
        ? "bg-info"
        : index % 4 === 1
        ? "bg-success"
        : index % 4 === 2
        ? "bg-warning"
        : "bg-danger";
    }
    const router = useRouter();

    function gotocart() {
      console.log(cart);
      router.push({ name: "cart" });
    }
    const store = useStore();
    function addtocart(a) {
      //   console.log(a);
      let ab = JSON.parse(localStorage.getItem("cart"));
      if (ab === null) {
        console.log("first");
        a = { ...a, count: 1 };
        cart.push(a);
        count.value = 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        store.commit("increament");
      } else {
        let cnt = 0;
        ab.some((element) => {
          if (element.id === a.id) {
            cnt = 1;
          }
        });
        if (cnt === 1) {
          console.log("first");
          ab[a.id].count = ab[a.id].count + 1;
          localStorage.setItem("cart", JSON.stringify(ab));
        } else {
          store.commit("increament");

          a = { ...a, count: 1 };
          ab.push(a);
          count.value = ab.length;
          localStorage.setItem("cart", JSON.stringify(ab));
        }
        console.log(ab);
      }
    }
    return {
      arr,
      getclass,
      gotocart,
      addtocart,
      count,
    };
  },
  //   methods: {
  //     addtocart(a) {
  //       console.log(a);
  //       this.$store.commit("increament");
  //     },
  //   },
};
</script>

<style lang="css" scoped></style>
