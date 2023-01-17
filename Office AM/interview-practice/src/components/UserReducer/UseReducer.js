import React, { useReducer } from "react";

const initialState = [
  {
    id: "101",
    title: "React assignment",
    complete: false,
  },
  {
    id: "102",
    title: "Nodejs assignment",
    complete: false,
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        return todo.id === action.id
          ? { ...todo, complete: !todo.complete }
          : todo;
      });
    default:
      return state;
  }
};

function UseReducer() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  console.log(todos);
  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {todo.title}
          </div>
        );
      })}
    </div>
  );
}

export default UseReducer;
