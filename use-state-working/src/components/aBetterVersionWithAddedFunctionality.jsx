import { useState } from "react";


const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m)-1]} ${parseInt(d)}, ${y}`;
};

const getDateStatus = (dateStr) => {
  if (!dateStr) return "normal";
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(dateStr + "T00:00:00");
  if (due < today) return "overdue";
  if (due.getTime() === today.getTime()) return "today";
  return "normal";
};

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Review project proposal", date: new Date().toISOString().split("T")[0], done: false },
  ]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!name.trim()) { setError("Task name is required."); return; }
    setError("");
    setTodos(prev => [
      { id: Date.now(), name: name.trim(), date, done: false },
      ...prev,
    ]);
    setName(""); setDate("");
  };

  const handleKey = (e) => { if (e.key === "Enter") handleAdd(); };

  const toggleDone = (id) =>
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id));

  const doneCount = todos.filter(t => t.done).length;
  const progress = todos.length ? (doneCount / todos.length) * 100 : 0;

  return (
    <>
      <div className="app">
        <div className="container">
          <div className="header">
            <div className="header-label">// workspace</div>
            <h1>Todo<span>.</span></h1>
            <p className="header-sub">{doneCount} of {todos.length} tasks completed</p>
          </div>

          <div className="form-card">
            <div className="field-group">
              <div className="field">
                <label>Task Name</label>
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={name}
                  onChange={e => { setName(e.target.value); setError(""); }}
                  onKeyDown={handleKey}
                />
              </div>
              <div className="field" style={{ width: 150 }}>
                <label>Due Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p className="error-msg">{error}</p>
              <button className="add-btn" onClick={handleAdd}>＋</button>
            </div>
          </div>

          {todos.length > 0 && (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          )}

          <div className="section-header">
            <span className="section-title">Tasks</span>
            <span className="count-badge"><span>{todos.filter(t=>!t.done).length}</span> remaining</span>
          </div>

          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◻</div>
              <p>No tasks yet</p>
            </div>
          ) : (
            <div className="todo-list">
              {todos.map(todo => {
                const status = getDateStatus(todo.date);
                return (
                  <div key={todo.id} className={`todo-item${todo.done ? " done" : ""}`}>
                    <button
                      className={`check-btn${todo.done ? " checked" : ""}`}
                      onClick={() => toggleDone(todo.id)}
                    >
                      {todo.done ? "✓" : ""}
                    </button>
                    <div className="todo-content">
                      <div className="todo-name">{todo.name}</div>
                      {todo.date && (
                        <div className={`todo-date ${status}`}>
                          <span className="date-dot" />
                          {status === "today" ? "Due today" : status === "overdue" ? "Overdue · " + formatDate(todo.date) : formatDate(todo.date)}
                        </div>
                      )}
                    </div>
                    <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}