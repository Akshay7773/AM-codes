import { createStore } from "vuex";
export default createStore({
  state: {
    count: 0,
  },
  mutations: {
    increament(state) {
      state.count++;
    },
  },
  // actions: {

  // },
  // getters: {

  // }
});
