const base = import.meta.env.BASE_URL;
export const asset = (path) => `${base}assets/${path}`;
export const weddingData = {
  groom: { name: "Danish" },
  bride: { name: "Priyanka" },
  date: {
    display: "21 November 2026",
    short: "21 • 11 • 2026",
    iso: "2026-11-21T00:00:00+05:30",
    calendar: "20261121",
    calendarEnd: "20261122",
  },
  venue: {
    name: "Noor E Mahal",
    city: "Mansa",
    address: "",
    mapUrl: "https://maps.app.goo.gl/j8ogE48LS8639HJz9",
  },
  audio: { src: asset("audio/wedding-music.mp3"), volume: 0.5 },
  images: {
    main: asset("couple/main-couple.webp"),
    groom: asset("illustrations/groom.webp"),
    bride: asset("illustrations/bride.webp"),
    welcome: asset("illustrations/couple-welcome.webp"),
  },
  ringCeremony: [
    {
      src: asset("ring-ceremony/ring-01.webp"),
      alt: "The rings held by Danish and Priyanka",
    },
  ],
  venueGallery: [
    {
      src: asset("venue/venue-01.webp"),
      alt: "Noor E Mahal palace beneath a starry sky",
    },
  ],
  family: [],
  blessings: [
    "May love always find its way home.",
    "Love brought us together. Your blessings make it complete.",
    "May this new chapter always be filled with love, laughter and light.",
  ],
  events: [
    ["Haldi", "Painted in sunshine & happiness", "🌼", "haldi"],
    ["Mehendi", "Love, laughter & a little mehendi magic", "❧", "mehendi"],
    ["Ring Ceremony", "A promise made forever", "💍", "ring"],
    ["Sangeet", "An evening of music, dance & celebration", "♫", "sangeet"],
    ["Baraat", "Let the celebration begin", "🥁", "baraat"],
    ["Wedding", "Where two stories become one", "✧", "wedding"],
  ].map(([title, description, icon, theme]) => ({
    title,
    description,
    icon,
    theme,
    date: title === "Wedding" ? "21 November 2026" : "",
    time: "",
    venue: title === "Wedding" ? "Noor E Mahal, Mansa" : "",
    image: "",
  })),
};
