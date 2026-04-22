import { useState } from "react";
import WithUseRef from "./components/withUseRef";
import WithoutUseRef from "./components/withoutUseRef";


// ─── Shared dot ID counter (module-level, outside React) ─────────────────────
let dotIdCounter = 0;

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [refDots, setRefDots] = useState([]);
  const [stateDots, setStateDots] = useState([]);

  const addRefDot   = () => setRefDots((d)   => [...d, ++dotIdCounter]);
  const addStateDot = () => setStateDots((d) => [...d, ++dotIdCounter]);

  return (
    <>
      <div className="page">
        <div className="header">
          <h1>
            <span className="ref">useRef</span> vs <span className="state">useState</span>
          </h1>
          <p>watch the render counter as you type</p>
        </div>

        <div className="columns">
          <WithUseRef
            renderDots={refDots}
            onRender={addRefDot}
            onReset={() => setRefDots([])}
          />
          <WithoutUseRef
            renderDots={stateDots}
            onRender={addStateDot}
            onReset={() => setStateDots([])}
          />
        </div>
      </div>
    </>
  );
}