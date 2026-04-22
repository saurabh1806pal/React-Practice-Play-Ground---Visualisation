import { useState, useRef } from "react";

// Props:
//   renderDots  – array of dot IDs to display (managed by App)
//   onRender    – call this when a real re-render happens (button press)
//   onReset     – call this to clear dots in App

export default function WithUseRef({ renderDots, onRender, onReset }) {
  const inputRef = useRef(null);
  const [liveValue, setLiveValue] = useState("");

  const handleCommit = () => {
    setLiveValue(inputRef.current.value); // only state change → only re-render here
    onRender();
  };

  const handleReset = () => {
    inputRef.current.value = "";
    setLiveValue("");
    onReset();
  };

  return (
    <div className="col col-left">
      <div className="col-label">⚡ useRef</div>
      <div className="col-title">No re-render on keystroke</div>
      <div className="col-desc">
        The input is controlled by a <strong>ref</strong>.<br />
        Typing does <em>not</em> trigger a re-render.<br />
        UI only updates when you press <strong>Set Value</strong>.
      </div>

      <div>
        <div className="section-title">Input</div>
        <div className="input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here… (no re-renders!)"
          />
          <button className="btn btn-green" onClick={handleCommit}>
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
            only when button is pressed
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