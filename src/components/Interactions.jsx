import React, { useState } from "react";
import { useSaved, saveDate } from "../helpers";
import { weddingData as d } from "../data";
import { useMagic } from "./Magic";
const levels = [
  { emoji: "😌", label: "Can't wait" },
  { emoji: "😍", label: "Super excited" },
  { emoji: "🥳", label: "Ready to celebrate" },
  { emoji: "🔥", label: "Baraat mode on!" },
];
export function WeddingHype() {
  const [level, setLevel] = useSaved("excitement", 0),
    [team, setTeam] = useSaved("team", "");
  const [dancing, setDancing] = useState("");
  const { burst, notify, celebrate } = useMagic();
  function selectLevel(n) {
    setLevel(n);
    burst(n === 0 ? "✦" : n === 1 ? "♥" : "🌼");
    if (n === 3) {
      celebrate();
      notify(
        "Your excitement has officially been added to the celebration! ❤️",
      );
    }
  }
  function selectTeam(name) {
    setTeam(name);
    setDancing(name);
    setTimeout(() => setDancing(""), 1800);
    burst(name === "Danish" ? "✦" : "♥");
    notify(
      name === "Danish"
        ? "Team Danish just got stronger! 🔥"
        : "Team Priyanka is ready to own the dance floor! 💃",
    );
  }
  return (
    <section id="hype" className="hype section">
      <div className="section-heading reveal">
        <p className="eyebrow">BRING YOUR HAPPY HEART</p>
        <h2>
          How excited <i>are you?</i>
        </h2>
        <p>We're counting the days… but we want to know about you.</p>
      </div>
      <div className="hype-meter reveal">
        <div className="meter-labels">
          {levels.map((l, i) => (
            <button
              key={i}
              className={level === i ? "selected" : ""}
              aria-pressed={level === i}
              onClick={() => selectLevel(i)}
            >
              <span>{l.emoji}</span>
              {l.label}
            </button>
          ))}
        </div>
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={level}
          aria-label="Your wedding excitement"
          aria-valuetext={levels[level].label}
          onChange={(e) => selectLevel(+e.target.value)}
          style={{ "--value": (level / 3) * 100 + "%" }}
        />
        <div className="hype-value">
          <p className="eyebrow">YOUR WEDDING HYPE</p>
          <strong>
            {levels[level].emoji} {(level + 1) * 25}% EXCITED
          </strong>
        </div>
      </div>
      <div className="vibe-wall reveal">
        <p className="eyebrow">DROP YOUR WEDDING VIBE</p>
        <p>Send a little energy our way.</p>
        <div className="reactions">
          {[
            ["😍", "Can't wait"],
            ["🥳", "Party ready"],
            ["💃", "Dance mode"],
            ["🔥", "Baraat mode"],
            ["❤️", "So happy"],
            ["✨", "Blessings"],
          ].map(([emoji, label]) => (
            <button
              key={label}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                burst(
                  emoji,
                  ((r.left + r.width / 2) / innerWidth) * 100,
                  (r.top / innerHeight) * 100,
                  12,
                );
                notify(label + " — we feel the love!");
              }}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="dance reveal">
        <p className="eyebrow">ARE YOU READY FOR THE DANCE FLOOR?</p>
        <h3>Whose side are you dancing with?</h3>
        <div className="team-options">
          {["Danish", "Priyanka"].map((name) => (
            <button
              key={name}
              onClick={() => selectTeam(name)}
              aria-pressed={team === name}
              className={`team ${team === name ? "chosen" : ""} ${dancing === name ? "dancing" : ""}`}
            >
              <img
                src={name === "Danish" ? d.images.groom : d.images.bride}
                alt=""
                loading="lazy"
              />
              <span>
                {name === "Danish" ? "🕺" : "💃"} TEAM {name.toUpperCase()}
              </span>
              {team === name && <small>YOUR DANCE-FLOOR FAMILY ✓</small>}
            </button>
          ))}
        </div>
        <p className="small-note">
          Your choice is saved on this device. Everyone's on team love.
        </p>
      </div>
    </section>
  );
}
export function Attendance() {
  const [choice, setChoice] = useSaved("attendance", "");
  const { burst } = useMagic();
  return (
    <section className="attendance section">
      <p className="eyebrow reveal">WE HAVE JUST ONE QUESTION…</p>
      <h2 className="reveal">
        Are you <i>coming?</i>
      </h2>
      <div className="attendance-options reveal">
        {[
          "❤️ Of course!",
          "🥳 Wouldn't miss it!",
          "🔥 Baraat mein milte hain!",
        ].map((c) => (
          <button
            className={`outline-button ${choice === c ? "selected" : ""}`}
            key={c}
            aria-pressed={choice === c}
            onClick={() => {
              setChoice(c);
              burst("🌼");
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {choice && (
        <div className="attendance-reply" role="status">
          <h3>Yay! ❤️</h3>
          <p>Danish & Priyanka can't wait to celebrate with you.</p>
          <p>{d.date.display}</p>
          <button className="text-link" onClick={saveDate}>
            SAVE THE DATE ↓
          </button>
        </div>
      )}
      <p className="small-note">
        A little promise between us. This is saved on your device, not a formal
        RSVP.
      </p>
    </section>
  );
}
