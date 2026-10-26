import React, { useRef, useState } from "react";
import { weddingData as d } from "../data";
import { useMagic } from "./Magic";
export function RingCeremony({ view }) {
  const [index, setIndex] = useState(0),
    [wave, setWave] = useState(false);
  const { burst, notify } = useMagic();
  const image = d.ringCeremony[index];
  function next() {
    setWave(true);
    setTimeout(() => setWave(false), 900);
    burst("✦");
    if (d.ringCeremony.length > 1)
      setIndex((i) => (i + 1) % d.ringCeremony.length);
    else {
      notify("One ring. One promise. One forever.");
      view(image);
    }
  }
  return (
    <section id="ring" data-stamp="ring" className="ring-section section">
      <div className="ring-copy reveal">
        <p className="eyebrow">01 / A PROMISE FOREVER</p>
        <h2>
          One ring.
          <br />
          One promise.
          <br />
          <i>One forever.</i>
        </h2>
        <p>
          A small circle. An endless promise.
          <br />
          The beginning of everything beautiful.
        </p>
        <button
          className={`ring-button ${wave ? "wave" : ""}`}
          onClick={next}
          aria-label="Turn the ring and view our ring ceremony memory"
        >
          <span className="gold-ring" />
          <span className="ring-caption">TOUCH A LITTLE FOREVER ↗</span>
        </button>
      </div>
      <div className="memory-stack reveal">
        <span className="memory-back" />
        <button
          className="memory-frame"
          onClick={() => view(image)}
          data-cursor="VIEW"
        >
          <img src={image.src} alt={image.alt} loading="lazy" />
          <span>
            OUR PROMISE, HELD CLOSE <i>01</i>
          </span>
        </button>
        <p className="handwritten">and so our story begins…</p>
      </div>
    </section>
  );
}
export function CelebrationTimeline() {
  const { celebrate } = useMagic();
  return (
    <section id="celebrations" className="celebrations section">
      <div className="section-heading reveal">
        <p className="eyebrow">THE CELEBRATIONS</p>
        <h2>
          A little tradition.
          <br />A whole lot of <i>love.</i>
        </h2>
        <p>Every celebration brings us one step closer to forever.</p>
      </div>
      <div className="timeline">
        {d.events.map((e, i) => (
          <article
            key={e.theme}
            data-stamp={
              ["haldi", "baraat", "wedding"].includes(e.theme)
                ? e.theme
                : undefined
            }
            className={`event event-${e.theme} reveal`}
          >
            <div className="event-number">0{i + 1}</div>
            <div className="event-symbol" aria-hidden="true">
              {e.icon}
            </div>
            <div className="event-copy">
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <div className="event-details">
                {e.date ? (
                  <span>{e.date}</span>
                ) : (
                  <span>Details to follow</span>
                )}
                {e.time && <span>{e.time}</span>}
                {e.venue && <span>{e.venue}</span>}
              </div>
            </div>
            {e.theme === "baraat" && (
              <button className="surprise-button" onClick={celebrate}>
                DO NOT PRESS 👀
              </button>
            )}
            {e.theme === "wedding" && (
              <span className="event-tag">THE BIG DAY</span>
            )}
          </article>
        ))}
      </div>
      <p className="small-note">
        The families will share the final celebration schedule.
      </p>
    </section>
  );
}
