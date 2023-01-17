var id = 0;
export const addData = (data) => {
  return {
    type: "ADD_DATA",
    payload: {
      data: data,
    },
  };
};

export const remData = (data, index) => {
  return {
    type: "REM_ONE",
    payload: {
      data: data,
      index: index,
    },
  };
};

export const remove = (data, num) => {
  return {
    type: "REMOVE",
    payload: {
      data: data,
      num: num,
    },
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};

// export const setcompleted = (id) => {
//   return {
//     type: "SET_COMPLETED",
//     id,
//   };
// };
