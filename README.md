# Danish & Priyanka — an invitation to forever

A responsive, static React + Vite wedding invitation for 21 November 2026 at Noor E Mahal, Mansa. Uses the supplied portraits, ring photo, venue photo, and unchanged wedding-music.mp3. No pre-wedding gallery, invented event times, or fabricated guest statistics.

## Run locally

Install Node.js 22 LTS or newer, then open this folder in a terminal:

```sh
npm install
npm run dev
```

Open the local address printed by Vite. Do not double-click index.html: this application requires a web server.

```sh
npm run build
npm run preview
```

`dist/` is the complete static website. The project also includes a prebuilt copy. npm scripts use the native configuration loader to avoid platform-specific configuration bundling issues.

## Publish free on GitHub Pages

1. Create a GitHub repository for the invitation and upload this folder's contents, including the hidden `.github` folder. Do not upload node_modules.
2. Use a `main` branch (or edit the workflow's branch name).
3. In the repository's **Settings → Pages**, choose **GitHub Actions** as the build source.
4. Push the files or run **Actions → Publish wedding invitation → Run workflow**.
5. After the workflow completes, open the page URL shown by the deployment.

The included workflow installs the locked dependencies, builds the site, sets absolute social-preview URLs using GitHub Pages' actual base URL, and deploys the `dist` folder. `base: './'` keeps images, music, and scripts working under repository subpaths or a custom domain. Enable HTTPS in Pages settings.

No GitHub repository or account was provided, so this deliverable has not been published to a public URL.

For another static host, set `SITE_URL` to the final origin plus any repository path before building. Example on macOS/Linux: `SITE_URL=https://example.com/invitation npm run build`. On PowerShell: `$env:SITE_URL='https://example.com/invitation'`, then `npm run build`. Do not include a trailing slash. Absolute metadata matters for WhatsApp previews; crawlers can cache earlier previews.

## Edit wedding details

All core information and asset references live in `src/data.js`:

- Couple names, display date, countdown target, calendar date and exclusive next-day end date.
- Venue name, city, blank postal-address field, and the supplied Google Maps link.
- Six possible celebrations, each supporting title, date, time, venue, description, icon, image, theme. Unconfirmed details display “Details to follow”.
- Ring and venue image arrays, blessing messages, audio source, target volume.

There is one supplied photo for each gallery. The ring opens that memory in a viewer; adding further entries enables cycling. The venue gallery supports horizontal snapping and the fullscreen viewer supports swipes and arrow keys when more photos exist. No images have been invented to fill a gallery.

Countdown: midnight at the start of 21 November 2026 in India (+05:30), not an invented ceremony time. Calendar: all-day event on 21 November, with the required exclusive end date of 22 November.

## Guest experience

- Short loading, a paper invitation with seal, tilt, opening transition, and welcome portraits.
- Music begins only from the explicit Open action; one persistent audio instance loops, fades toward 50%, pauses and resumes at its current position. Browser/device volume policies still apply.
- Tap either portrait for the couple animation, infinity symbol and monogram.
- Countdown, framed ring memory, six celebration chapters, and a replayable Baraat surprise.
- Four-level excitement meter, reactions, and dance team choice.
- Three Canvas scratch cards; roughly 47% coverage reveals each. Buttons provide keyboard and assistive-technology alternatives.
- Four passport stamps collected by visiting the ring, Haldi, Baraat and wedding sections, unlocking the golden card.
- Playful attendance choice, venue photo and Maps link, interactive diya, blessings, three-tap secret heart.
- Main portrait, ICS download, native sharing with clipboard fallback, and a final namaste.

Guest choices are saved only in this browser. `guestStore` in `src/helpers.js` is the replaceable persistence adapter. A real RSVP or shared counts require a backend and clear guest consent. Nothing is sent to the couple by these playful interactions. Storage failures degrade gracefully.

## Structure

- `src/components/Opening.jsx` — initial invitation
- `Welcome.jsx` — welcome, couple magic, countdown
- `Chapters.jsx` — ring and celebration journey
- `Interactions.jsx` — excitement, reactions, teams, attendance
- `Surprises.jsx` — Canvas scratch cards and passport
- `Ending.jsx` — venue, diya, portrait, calendar, sharing, finale
- `Chrome.jsx` — chapter menu, music button, photo dialog, cursor
- `Magic.jsx` — rate-limited particles, celebration overlay, feedback
- `src/styles.css` — responsive art direction and reduced-motion rules
- `public/assets/` — optimized WebP images and original MP3
- `public/social-preview.jpg` — requested landscape sharing card

The social card was produced with the built-in image-generation tool using the supplied main photograph. Prompt: create an ivory, burgundy and antique-gold landscape wedding card, preserve the couple's photographic identity, and show “DANISH WEDS PRIYANKA”, “21 NOVEMBER 2026”, “NOOR E MAHAL • MANSA”. The original supplied photos remain the in-page assets.

## Accessibility and performance

Semantic buttons, descriptive image text, keyboard-accessible photo dialog, Escape-to-close, visible focus indicators, touch scratch handling, safe-area controls, and reduced-motion support. Particle count is capped and effects are rate-limited. Photos are locally optimized; secondary photos load lazily. Google Fonts has local serif/sans fallback stacks. All information is present independently of scroll animations.

The optional feature-detected `read_wedding_details` WebMCP tool is read-only. Unsupported browsers ignore it.

Before sending to guests, confirm all celebration details and review the invitation on a real iPhone and Android phone. Native share sheets, device audio policies and physical touch cannot be fully represented by a desktop browser preview.
