Live verification of PR #45 on https://cohereboulder.org (2026-10-07). Tested real production responses with Playwright; no mocked sessions or registration data.

| Check | Result |
|---|---|
| Main deploy [37668040884](https://github.com/Woven-Web/cohereboulder.org/actions/runs/37668040884), merge `efebed60` | PASS — completed successfully |
| Live asset changed | PASS — `index-wORvRO8Z.js` → `index-BpC3XDhG.js` |
| Signed out: `/` remains home, Register CTA, `/events` | PASS — 390×844 / 1280×800, en / es |
| Uni signed in: `/` remains home, Register CTA remains | PASS — both viewports and languages |
| Logo and Home/Inicio from events reach `/` | PASS — both viewports and languages |
| Uni `/api/me/registration` | PASS — HTTP 200, `{"registered":false}` |
| Anonymous `/api/me/registration` | PASS — HTTP 401 |
| Fresh email-link sign-in landing | PASS — `/events` |
| Sign out and confirm session absent | PASS — logout HTTP 200; no session DID afterward |

49 assertions passed. Page errors: **0**. Same-origin HTTP responses ≥400: **0** during page loading (the explicit anonymous 401 probe was made separately). Failed same-origin browser requests: **60**: 20 × `/Ecosystem.pdf` (net::ERR_ABORTED), 40 × `/cdn-cgi/rum` (net::ERR_FAILED). Analytics POSTs were deliberately blocked to enforce the no-production-write rule; PDF loads were canceled during navigation. No feature checks failed.

Signed in only as Uni’s existing account (`claudeji.scenius.social`) using the fresh link read from Uni’s inbox. No handle creation, registration, RSVP, or other form submission. Signed out at the end. On signed-out mobile events, Register is available in the navigation menu.

Screenshots and every 800×1067 greyscale copy: [pr45-live folder](https://github.com/unforcedagi/cohereboulder.org/tree/review-shots-2026-10-06/pr45-live). [Machine-readable results](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/results.json). Local copies: `/home/uni/.hermes/cache/scratch/slice2b-live-shots/`.

<details>
<summary>signed-out: home and events, both sizes / languages</summary>

**390 — en**

![signed-out 390 en home](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-out-390-en-home.png)

![signed-out 390 en events](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-out-390-en-events.png)

**390 — es**

![signed-out 390 es home](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-out-390-es-home.png)

![signed-out 390 es events](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-out-390-es-events.png)

**1280 — en**

![signed-out 1280 en home](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-out-1280-en-home.png)

![signed-out 1280 en events](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-out-1280-en-events.png)

**1280 — es**

![signed-out 1280 es home](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-out-1280-es-home.png)

![signed-out 1280 es events](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-out-1280-es-events.png)

</details>

<details>
<summary>signed-in: home and events, both sizes / languages</summary>

**390 — en**

![signed-in 390 en home](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-390-en-home.png)

![signed-in 390 en events](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-390-en-events.png)

**390 — es**

![signed-in 390 es home](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-390-es-home.png)

![signed-in 390 es events](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-390-es-events.png)

**1280 — en**

![signed-in 1280 en home](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-1280-en-home.png)

![signed-in 1280 en events](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-1280-en-events.png)

**1280 — es**

![signed-in 1280 es home](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-1280-es-home.png)

![signed-in 1280 es events](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-1280-es-events.png)

</details>

<details>
<summary>Fresh sign-in landing and representative greyscale</summary>

![Fresh sign-in landing](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/fresh-sign-in-events.png)

![Greyscale 800×1067](https://raw.githubusercontent.com/unforcedagi/cohereboulder.org/review-shots-2026-10-06/pr45-live/signed-in-390-es-home-gray-800x1067.png)

</details>
