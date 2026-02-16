import { useEffect, useState } from "react";
import API from "./api";
import "./todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await API.get("todos/");
    setTodos(res.data);
  };

  const createTodo = async () => {
    if (!title.trim()) return;

    await API.post("todos/", { title });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await API.patch(`todos/${todo.id}/`, {
      is_completed: !todo.is_completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`todos/${id}/`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h2>My Todos</h2>

      <div className="input-section">
        <input
          value={title}
          placeholder="New Task..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.is_completed ? "completed" : ""}
          >
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={() => toggleTodo(todo)}
            />

            <span>{todo.title}</span>

            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}