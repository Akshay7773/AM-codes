import { createStore } from "vuex";
export default createStore({
    state: {
        name: "code Improve ",
        mainTitle: "******* No Title ****",
        count:0
    },
    mutations: {
        increment(state) {
              state.count++;
        }
    }
})