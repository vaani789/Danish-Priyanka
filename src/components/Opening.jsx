import React, { useEffect, useState } from "react";
import { weddingData as d } from "../data";
export default function Opening({ onOpen }) {
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`opening ${opening ? "is-opening" : ""}`}>
      <div className="ambient" />
      <p className="opening-top">A CELEBRATION OF LOVE</p>
      {loading ? (
        <div className="loading">
          <div className="monogram">
            D <span>♥</span> P
          </div>
          <p>Preparing something beautiful...</p>
        </div>
      ) : (
        <div className="invitation-perspective">
          <div
            className="envelope"
            onPointerMove={(e) => {
              if (e.pointerType === "mouse") {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.transform = `rotateY(${((e.clientX - r.left - r.width / 2) / r.width) * 5}deg) rotateX(${(-(e.clientY - r.top - r.height / 2) / r.height) * 5}deg)`;
              }
            }}
            onPointerLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            <div className="envelope-border">
              <span className="ornament">❧</span>
              <p className="eyebrow">YOU'RE INVITED</p>
              <h1>
                Danish <i>&</i> Priyanka
              </h1>
              <p className="invitation-sub">
                Two hearts. One beautiful forever.
              </p>
              <div className="seal" aria-hidden="true">
                D <small>&</small> P
              </div>
              <p className="date-line">{d.date.short}</p>
              <p className="eyebrow">
                {d.venue.name} · {d.venue.city}
              </p>
              <button
                className="button"
                data-cursor="OPEN"
                disabled={opening}
                onClick={() => {
                  setOpening(true);
                  onOpen();
                }}
              >
                OPEN OUR INVITATION <span>↗</span>
              </button>
              <p className="audio-note">
                Best experienced with sound <span>♫</span>
              </p>
              <span className="ornament bottom">❧</span>
            </div>
          </div>
        </div>
      )}
      <p className="opening-bottom">WITH THE BLESSINGS OF OUR FAMILIES</p>
      <div className="door left" />
      <div className="door right" />
    </div>
  );
}
