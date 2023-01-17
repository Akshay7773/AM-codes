// import undoable from "redux-undo";

// var arr2 = [
//   { name: "ak", roll: 2 },
//   { name: "aa", roll: 3 },
// ];

// let ob = { name: "ajjj", roll: 43 };

// console.log(arr2); // Apple,Grape,Pear,Peach,Grapefruit
// arr2.splice(1, 0, ob);
// console.log(arr2);

const initialState = {
  list: [],
  price: 0,
  cart: 0,
  dupRemove: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      // console.log(state.list);

      // console.log("payload", action.payload);
      const arrObjOne = [
        ...new Map(
          state.list.map((item) => [JSON.stringify(item), item])
        ).values(),
      ];

      return {
        ...state,
        cart: arrObjOne.length,
        price: state.price + parseInt(action.payload.data.price),
        list: [
          ...state.list,
          {
            list: action.payload,
          },
        ],
      };
    case "REM_ONE":
      console.log(state.list);
      // console.log(action.payload);
      let narr = state.list;
      console.log(narr);
      console.log(action.payload.data.list.data._id);
      for (let i = narr.length - 1; i >= 0; i--) {
        if (narr[i].list.data._id === action.payload.data.list.data._id) {
          narr.splice(i, 1);
          break;
        }
      }
      // console.log(narr);

      // console.log(state.price, action.payload.data.list.data.price);
      // console.log(action);
      return {
        // ...state,
        price:
          parseInt(state.price) - parseInt(action.payload.data.list.data.price),
        list: narr,
      };

    case "REMOVE":
      console.log(state.list);
      console.log(action.payload);
      let arr = [];
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].list.data._id !== action.payload.data.list.data._id)
          arr.push(state.list[i]);
      }
      console.log(arr);
      return {
        // ...state,
        price:
          parseInt(state.price) -
          parseInt(action.payload.data.list.data.price) *
            parseInt(action.payload.num),
        list: arr,
      };

    case "RESET":
      // console.log(state.list);
      console.log("first");
      return {
        ...state,
        cart: 0,
        price: 0,
        list: [],
      };
    default:
      return state;
  }
};
// const undoableTodos = undoable(todoReducer);
// export default undoableTodos;
export default todoReducer;
