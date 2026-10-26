import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
const MagicContext = createContext(null);
export const useMagic = () => useContext(MagicContext);
export default function MagicProvider({ children }) {
  const [particles, setParticles] = useState([]),
    [message, setMessage] = useState(""),
    [baraat, setBaraat] = useState(false);
  const last = useRef(0),
    timers = useRef([]);
  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function notify(text) {
    setMessage(text);
    later(() => setMessage((m) => (m === text ? "" : m)), 4200);
  }
  function burst(symbol = "✦", x = 50, y = 65, count = 20) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const now = performance.now();
    if (now - last.current < 250) return;
    last.current = now;
    const id = Date.now();
    setParticles((p) => [
      ...p.slice(-30),
      ...Array.from({ length: count }, (_, i) => ({
        id: id + i,
        symbol,
        x: x + (Math.random() - 0.5) * 12,
        y,
        dx: (Math.random() - 0.5) * 350,
        dy: -100 - Math.random() * 430,
        r: Math.random() * 180,
        delay: Math.random() * 0.3,
      })),
    ]);
    later(
      () =>
        setParticles((p) => p.filter((a) => a.id < id || a.id >= id + count)),
      2600,
    );
  }
  function celebrate() {
    if (baraat) return;
    notify("We warned you... 😏");
    later(() => {
      setBaraat(true);
      burst("🌼", 50, 90, 30);
      later(() => setBaraat(false), 3700);
    }, 500);
  }
  return (
    <MagicContext.Provider value={{ burst, notify, celebrate }}>
      {children}
      <div className="particle-system" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              left: p.x + "%",
              top: p.y + "%",
              "--dx": p.dx + "px",
              "--dy": p.dy + "px",
              "--rotation": p.r + "deg",
              animationDelay: p.delay + "s",
            }}
          >
            {p.symbol}
          </span>
        ))}
      </div>
      {baraat && (
        <div className="baraat-overlay" role="status">
          <p className="eyebrow">BARAAT MODE</p>
          <div className="dhol">🥁</div>
          <h2>Shaadi hai bhai!</h2>
          <p>21 • 11 • 2026</p>
        </div>
      )}
      <div className={`toast ${message ? "visible" : ""}`} role="status">
        {message}
      </div>
    </MagicContext.Provider>
  );
}
