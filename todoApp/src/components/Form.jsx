import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };
  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [editTodo, setInput]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      const todo = {
        id: uuid(),
        title: input,
        completed: false,
      };
      setTodos([...todos, todo]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        onChange={handleChange}
        value={input}
        placeholder="Enter a Todo...."
        required
      />
      <button className="button-add" type="submit">
        {editTodo ? "Save" : "Add"}
      </button>
    </form>
  );
};

export default Form;
