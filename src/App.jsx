import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Opening from "./components/Opening";
import MagicProvider, { useMagic } from "./components/Magic";
import { WelcomeCouple, WeddingCountdown } from "./components/Welcome";
import { RingCeremony, CelebrationTimeline } from "./components/Chapters";
import { WeddingHype, Attendance } from "./components/Interactions";
import { ScratchCardSection, WeddingPassport } from "./components/Surprises";
import { VenueReveal, Blessings, FinalInvitation } from "./components/Ending";
import {
  FloatingNavigation,
  Lightbox,
  CustomCursor,
} from "./components/Chrome";
import { useMusic, useSaved } from "./helpers";
gsap.registerPlugin(ScrollTrigger);
function Experience() {
  const [opening, setOpening] = useState(false),
    [opened, setOpened] = useState(false),
    [photo, setPhoto] = useState(null),
    [stamps, setStamps] = useSaved("passport", []);
  const music = useMusic();
  const { burst, notify } = useMagic();
  const timer = useRef(null),
    main = useRef(null);
  function open() {
    music.play();
    setOpening(true);
    timer.current = setTimeout(() => {
      setOpened(true);
      window.scrollTo(0, 0);
      burst("✦");
    }, 1400);
  }
  function view(item, images, index) {
    setPhoto({ ...item, images, index });
  }
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!opened) return;
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.utils
          .toArray(".reveal")
          .forEach((el) =>
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 1,
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
              ease: "power2.out",
            }),
          );
    }, main);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const key = e.target.dataset.stamp;
            setStamps((s) => (s.includes(key) ? s : [...s, key]));
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    document
      .querySelectorAll("[data-stamp]")
      .forEach((el) => observer.observe(el));
    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, [opened]);
  useEffect(() => {
    if (stamps.length === 4 && opened) {
      notify("You're officially wedding-ready! 🥳");
      burst("🌼");
    }
  }, [stamps.length, opened]);
  useEffect(() => {
    if (!document.modelContext?.registerTool) return;
    const controller = new AbortController();
    try {
      Promise.resolve(
        document.modelContext.registerTool(
          {
            name: "read_wedding_details",
            description: "Read the wedding date, venue, and chapter names.",
            inputSchema: {
              type: "object",
              properties: {},
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true },
            execute: () => ({
              couple: "Danish & Priyanka",
              date: "21 November 2026",
              venue: "Noor E Mahal, Mansa",
              timings: "To follow",
              chapters: [
                "welcome",
                "countdown",
                "ring",
                "celebrations",
                "hype",
                "surprises",
                "venue",
                "invitation",
              ],
            }),
          },
          { signal: controller.signal },
        ),
      ).catch(() => {});
    } catch {}
    return () => controller.abort();
  }, []);
  return (
    <>
      <a className="skip-link" href={opened ? "#countdown" : "#root"}>
        Skip to wedding details
      </a>
      {!opened && <Opening onOpen={open} />}
      <CustomCursor />
      {opened && (
        <>
          <main
            ref={main}
            onPointerDown={(e) => {
              if (
                e.pointerType === "touch" &&
                !e.target.closest("button,a,input,canvas")
              )
                burst(
                  "✦",
                  (e.clientX / innerWidth) * 100,
                  (e.clientY / innerHeight) * 100,
                  4,
                );
            }}
          >
            <WelcomeCouple />
            <WeddingCountdown />
            <RingCeremony view={view} />
            <CelebrationTimeline />
            <WeddingHype />
            <ScratchCardSection view={view} />
            <WeddingPassport stamps={stamps} />
            <Attendance />
            <VenueReveal view={view} />
            <Blessings view={view} />
            <FinalInvitation view={view} />
          </main>
        </>
      )}
      {opening && <FloatingNavigation music={music} />}
      <div className="sr-only" role="status">
        {music.failed
          ? "Music could not start. Use the music button to retry."
          : ""}
      </div>
      {photo && <Lightbox item={photo} onClose={() => setPhoto(null)} />}
    </>
  );
}
export default function App() {
  return (
    <MagicProvider>
      <Experience />
    </MagicProvider>
  );
}
