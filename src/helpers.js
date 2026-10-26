import { useEffect, useRef, useState } from "react";
import { weddingData as d } from "./data";
// Device-local adapter. Replace these methods with a real service when adding shared reactions or RSVP.
export const guestStore = {
  read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem("dp-" + key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem("dp-" + key, JSON.stringify(value));
    } catch {}
  },
};
export function useSaved(key, initial) {
  const [value, setValue] = useState(() => guestStore.read(key, initial));
  useEffect(() => guestStore.write(key, value), [key, value]);
  return [value, setValue];
}
export function useMusic() {
  const audio = useRef(null),
    frame = useRef(0),
    target = useRef(false),
    [playing, setPlaying] = useState(false),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    const a = new Audio(d.audio.src);
    a.loop = true;
    a.preload = "none";
    a.volume = 0;
    audio.current = a;
    return () => {
      cancelAnimationFrame(frame.current);
      a.pause();
      a.removeAttribute("src");
    };
  }, []);
  const fade = (to, pause = false) => {
    cancelAnimationFrame(frame.current);
    const a = audio.current,
      from = a.volume,
      start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / 1400, 1);
      a.volume = from + (to - from) * p;
      if (p < 1) frame.current = requestAnimationFrame(step);
      else if (pause) a.pause();
    }
    frame.current = requestAnimationFrame(step);
  };
  const play = () => {
    cancelAnimationFrame(frame.current);
    target.current = true;
    const a = audio.current;
    a.volume = 0;
    setFailed(false);
    const promise = a.play();
    promise
      .then(() => {
        if (target.current) {
          setPlaying(true);
          fade(d.audio.volume);
        } else a.pause();
      })
      .catch(() => {
        target.current = false;
        setPlaying(false);
        setFailed(true);
      });
  };
  const toggle = () => {
    if (target.current) {
      target.current = false;
      setPlaying(false);
      fade(0, true);
    } else play();
  };
  return { play, toggle, playing, failed };
}
export function saveDate() {
  const escape = (s) =>
    s
      .replaceAll("\\", "\\\\")
      .replaceAll("\n", "\\n")
      .replaceAll(",", "\\,")
      .replaceAll(";", "\\;");
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Danish and Priyanka//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:danish-priyanka-20261121@wedding.local",
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${d.date.calendar}`,
    `DTEND;VALUE=DATE:${d.date.calendarEnd}`,
    `SUMMARY:${escape(d.groom.name + " & " + d.bride.name + " Wedding")}`,
    `LOCATION:${escape(d.venue.name + ", " + d.venue.city)}`,
    "DESCRIPTION:Wedding celebration. Event timings will be shared by the families.",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/calendar;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "Danish-Priyanka-Wedding.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export async function shareInvitation(notify) {
  const data = {
    title: "Danish & Priyanka",
    text: `Celebrate with us • ${d.date.display}`,
    url: location.href.split("#")[0],
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard.writeText(data.url);
    notify("Invitation link copied ❤️");
  } catch (e) {
    if (e.name === "AbortError") return;
    try {
      await navigator.clipboard.writeText(data.url);
      notify("Invitation link copied ❤️");
    } catch {
      notify("Copy the invitation link from your address bar to share it.");
    }
  }
}
