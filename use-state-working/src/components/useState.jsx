import { useState } from "react";



export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const addTodo = () => {
    if (!name.trim()) return;
    setTodos([
      { id: Date.now(), name: name.trim(), date, done: false },
      ...todos,
    ]);
    setName("");
    setDate("");
  };

  const toggleDone = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <>
      <div className="app">
        <div className="header">
          <h1>Todo<span>.</span></h1>
          <p>Stay on track, one task at a time</p>
        </div>

        {/* Input Card */}
        <div className="card">
          <div className="input-row">
            <div className="input-group">
              <label>Task Name</label>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
              />
            </div>
            <div className="input-group">
              <label>Due Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="add-btn" onClick={addTodo}>
              + Add Task
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="list-section">
          <div className="list-header">
            <span>Tasks</span>
            <span className="count-badge">{todos.length} total</span>
          </div>

          {todos.length === 0 ? (
            <div className="empty">No tasks yet — add one above</div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className={`todo-item${todo.done ? " done" : ""}`}>
                <div
                  className={`checkbox${todo.done ? " checked" : ""}`}
                  onClick={() => toggleDone(todo.id)}
                >
                  {todo.done && (
                    <svg viewBox="0 0 12 12" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  )}
                </div>

                <div className="todo-info">
                  <div className="todo-name">{todo.name}</div>
                  {todo.date && (
                    <div className="todo-date">{todo.date}</div>
                  )}
                </div>

                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}