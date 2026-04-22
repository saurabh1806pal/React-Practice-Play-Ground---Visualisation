import { useState } from "react";

// Props:
//   renderDots  – array of dot IDs to display (managed by App)
//   onRender    – call this on every keystroke (each one is a re-render)
//   onReset     – call this to clear dots in App

export default function WithoutUseRef({ renderDots, onRender, onReset }) {
  const [inputValue, setInputValue] = useState("");
  const [liveValue, setLiveValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value); // re-render on every keystroke
    onRender();
  };

  const handleCommit = () => {
    setLiveValue(inputValue);
  };

  const handleReset = () => {
    setInputValue("");
    setLiveValue("");
    onReset();
  };

  return (
    <div className="col col-right">
      <div className="col-label">🔥 useState</div>
      <div className="col-title">Re-renders on every keystroke</div>
      <div className="col-desc">
        The input is controlled by <strong>state</strong>.<br />
        Every character you type calls <strong>setState</strong>,<br />
        which forces the whole component to re-paint.
      </div>

      <div>
        <div className="section-title">Input</div>
        <div className="input-row">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type here… (re-renders each key!)"
          />
          <button className="btn btn-red" onClick={handleCommit}>
            Set Value
          </button>
        </div>
      </div>

      <div className="live-box">
        <div className="live-box-label">
          Live Value (updates on button press only)
        </div>
        <div className={`live-value ${liveValue === "" ? "empty" : ""}`}>
          {liveValue === "" ? "nothing committed yet" : liveValue}
        </div>
      </div>

      <div className="render-track">
        <div>
          <div className="render-track-label">Re-renders triggered</div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "#444",
              marginTop: "0.2rem",
            }}
          >
            once per keystroke
          </div>
        </div>
        <div className="render-count">{renderDots.length}</div>
      </div>

      <div>
        <div className="flash-log-label">
          <span>Render flashes</span>
          <button className="btn btn-ghost" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="flash-log">
          {renderDots.map((id) => (
            <div key={id} className="flash-dot" />
          ))}
        </div>
      </div>
    </div>
  );
}