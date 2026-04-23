import { useState, useEffect } from "react";


// ─── helpers ──────────────────────────────────────────────────────────────────
let logId = 0;
const ts = () => new Date().toLocaleTimeString("en", { hour12: false });
const mkEntry = (msg) => ({ id: ++logId, time: ts(), msg });

// ─── CARD 1 — Run once on mount ───────────────────────────────────────────────
function Card1() {
  const [log, setLog] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // [] means: run ONCE after the first render, never again
    setLog((l) => [...l, mkEntry("Component mounted — effect ran!")]);
    setMounted(true);
  }, []);

  const reset = () => {
    setLog([]);
    setMounted(false);
    // re-trigger by remounting — done in parent via key trick (see Card1Wrapper)
  };

  return (
    <div>
      <div className="live-label">Live demo</div>

      <div className="controls">
        <div className={`pill`}>
          <div className="pill-dot" />
          {mounted ? "mounted" : "not mounted"}
        </div>
      </div>

      <div className="log">
        {log.length === 0
          ? <span className="log-empty">waiting for mount…</span>
          : log.map((e) => (
            <div key={e.id} className="log-entry">
              <span className="log-time">{e.time}</span>{e.msg}
            </div>
          ))
        }
      </div>

      <div className="controls">
        <button className="ctrl-btn ghost" onClick={reset}>Remount component</button>
      </div>
    </div>
  );
}

// Wrapper uses a key to force React to fully remount Card1
function Card1Wrapper() {
  const [key, setKey] = useState(0);
  return <Card1Remountable key={key} onRemount={() => setKey((k) => k + 1)} />;
}

function Card1Remountable({ onRemount }) {
  const [log, setLog] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLog((l) => [...l, mkEntry("Component mounted — effect ran!")]);
    setMounted(true);
  }, []);

  return (
    <div>
      <div className="live-label">Live demo</div>
      <div className="controls">
        <div className="pill">
          <div className="pill-dot" />
          {mounted ? "mounted" : "…"}
        </div>
      </div>
      <div className="log">
        {log.length === 0
          ? <span className="log-empty">waiting for mount…</span>
          : log.map((e) => (
            <div key={e.id} className="log-entry">
              <span className="log-time">{e.time}</span>{e.msg}
            </div>
          ))
        }
      </div>
      <div className="controls">
        <button className="ctrl-btn ghost" onClick={onRemount}>↺ Remount</button>
      </div>
    </div>
  );
}

// ─── CARD 2 — Re-run when dependency changes ──────────────────────────────────
function Card2() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    // runs every time `count` changes
    if (count === 0) {
      setLog([mkEntry(`count is ${count} — initial run`)]);
    } else {
      setLog((l) => [...l, mkEntry(`count changed → now ${count}`)]);
    }
  }, [count]);               // ← count is the dependency

  return (
    <div>
      <div className="live-label">Live demo</div>

      <div>
        <div className="big-count">{count}</div>
        <div className="count-label">current count</div>
      </div>

      <div className="controls">
        <button className="ctrl-btn teal" onClick={() => setCount((c) => c + 1)}>
          + Increment
        </button>
        <button className="ctrl-btn ghost" onClick={() => { setCount(0); setLog([]); }}>
          Reset
        </button>
      </div>

      <div className="log">
        {log.map((e) => (
          <div key={e.id} className="log-entry">
            <span className="log-time">{e.time}</span>{e.msg}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CARD 3 — Cleanup (interval timer) ───────────────────────────────────────
function Card3() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (!running) return;

    // SETUP — start the interval
    setLog((l) => [...l, mkEntry("▶ interval started")]);
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // CLEANUP — React calls this when running changes or component unmounts
    return () => {
      clearInterval(id);
      setLog((l) => [...l, mkEntry("■ interval cleared (cleanup ran)")]);
    };
  }, [running]);             // ← re-runs when running flips

  const reset = () => {
    setRunning(false);
    setSeconds(0);
    setLog([]);
  };

  const pad = (n) => String(n).padStart(2, "0");
  const display = `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;

  return (
    <div>
      <div className="live-label">Live demo</div>

      <div>
        <div className="timer-display">{display}</div>
        <div className="timer-status">{running ? "● running" : "■ stopped"}</div>
      </div>

      <div className="controls">
        <button
          className={`ctrl-btn ${running ? "ghost" : "green"}`}
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "■ Stop" : "▶ Start"}
        </button>
        <button className="ctrl-btn ghost" onClick={reset}>Reset</button>
      </div>

      <div className="log">
        {log.length === 0
          ? <span className="log-empty">press Start to see cleanup in action…</span>
          : log.map((e) => (
            <div key={e.id} className="log-entry">
              <span className="log-time">{e.time}</span>{e.msg}
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const cards = [
    {
      cls: "c1",
      num: "01",
      title: "Run once on mount",
      sub: "useEffect(() => { … }, [])",
      code: (
        <pre>
          <span className="cm">{"// Empty [] = run once after first render\n"}</span>
          {"\n"}
          <span className="kw">{"useEffect"}</span>{"(() => {\n"}
          {"  "}<span className="fn">{"doSomething"}</span>{"();\n"}
          {"  "}<span className="cm">{"// e.g. fetch data, set up a subscription\n"}</span>
          {"}, "}
          <span className="str">{"[]"}</span>
          {");\n"}
          {"\n"}
          <span className="cm">{"// ↑ second arg is the dependency array\n"}</span>
          <span className="cm">{"// [] means: no dependencies → never re-runs"}</span>
        </pre>
      ),
      demo: <Card1Wrapper />,
    },
    {
      cls: "c2",
      num: "02",
      title: "Re-run on dependency change",
      sub: "useEffect(() => { … }, [value])",
      code: (
        <pre>
          <span className="cm">{"// Runs on mount AND whenever `count` changes\n"}</span>
          {"\n"}
          <span className="kw">{"useEffect"}</span>{"(() => {\n"}
          {"  console."}<span className="fn">{"log"}</span>{"("}
          <span className="str">{"\"count is \""}</span>
          {", count);\n"}
          {"}, "}
          <span className="str">{"[count]"}</span>
          {");\n"}
          {"\n"}
          <span className="cm">{"// ↑ React compares count after every render\n"}</span>
          <span className="cm">{"// If it changed, the effect fires again"}</span>
        </pre>
      ),
      demo: <Card2 />,
    },
    {
      cls: "c3",
      num: "03",
      title: "Cleanup function",
      sub: "useEffect(() => { … ; return () => cleanup() }, [dep])",
      code: (
        <pre>
          <span className="cm">{"// Return a function → React calls it on cleanup\n"}</span>
          {"\n"}
          <span className="kw">{"useEffect"}</span>{"(() => {\n"}
          {"  "}<span className="kw">{"const"}</span>{" id = "}
          <span className="fn">{"setInterval"}</span>{"(tick, "}
          <span className="num">{"1000"}</span>{");\n"}
          {"\n"}
          {"  "}<span className="kw">{"return"}</span>{" () => {\n"}
          {"    "}<span className="fn">{"clearInterval"}</span>{"(id);\n"}
          {"    "}<span className="cm">{"// ← runs before next effect OR on unmount\n"}</span>
          {"  };\n"}
          {"}, [running]);"}
        </pre>
      ),
      demo: <Card3 />,
    },
  ];

  return (
    <>
      <div className="page">
        <div className="header">
          <div className="header-eyebrow">React Hooks</div>
          <h1>
            <span className="hook">useEffect</span>
          </h1>
          <div className="header-sub">
            3 forms — mount · dependency · cleanup
          </div>
        </div>

        <div className="cards">
          {cards.map((c) => (
            <div key={c.num} className={`card ${c.cls}`}>
              <div className="card-header">
                <div className="card-number">{c.num}</div>
                <div>
                  <div className="card-title">{c.title}</div>
                  <div className="card-subtitle">{c.sub}</div>
                </div>
              </div>
              <div className="card-body">
                <div className="code-panel">
                  <div className="code-label">Code</div>
                  {c.code}
                </div>
                <div className="live-panel">{c.demo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}