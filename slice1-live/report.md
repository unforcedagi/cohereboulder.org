# Live verification — PR #42

Deploy run 37552920098: SUCCESS (`gh run watch --exit-status` exited 0).
Live JS asset: `/assets/index-BB7O142o.js`; differs from `/assets/index-BJuaK3tp.js`.
“Subscribe to calendar” is present in the deployed bundle and the rendered English calendar and Opening page (the initial HTML is a Vite app shell).

Opening page, from the first event card: https://cohereboulder.org/events/did%3Aplc%3Aw54s52ycbw5lreyhlzexredb/ev-mtka98hjazago4

16 signed-out page captures; 20 full-page PNGs including CSS `grayscale(1)` copies of both pages in both languages at 800×1067. No sign-in, RSVP, or form submission. Non-read-only HTTP requests were blocked; only Cloudflare RUM POSTs were attempted.

| Page | Viewport | Language | One filled RSVP/card | No orphan More/… | Three secondary buttons, no singleton row | Footer no leading bullet | Spanish “Quiénes somos” | No English UI chrome (literal) | Page errors | Broken images |
|---|---|---|---|---|---|---|---|---|---|---|
| calendar | 390×844 | en | PASS (31/31) | PASS | N/A | PASS | N/A | N/A | 0 | 0 |
| calendar | 390×844 | es | PASS (31/31) | PASS | N/A | PASS | PASS | FAIL: English language selector | 0 | 0 |
| event | 390×844 | en | N/A | PASS | FAIL (3 buttons / 3 rows) | PASS | N/A | N/A | 0 | 0 |
| event | 390×844 | es | N/A | PASS | FAIL (3 buttons / 3 rows) | PASS | PASS | FAIL: English language selector | 0 | 0 |
| calendar | 800×1067 | en | PASS (31/31) | PASS | N/A | PASS | N/A | N/A | 0 | 0 |
| calendar | 800×1067 | es | PASS (31/31) | PASS | N/A | PASS | PASS | FAIL: English language selector | 0 | 0 |
| event | 800×1067 | en | N/A | PASS | PASS | PASS | N/A | N/A | 0 | 0 |
| event | 800×1067 | es | N/A | PASS | PASS | PASS | PASS | FAIL: English language selector | 0 | 0 |
| calendar | 1067×800 | en | PASS (31/31) | PASS | N/A | PASS | N/A | N/A | 0 | 0 |
| calendar | 1067×800 | es | PASS (31/31) | PASS | N/A | PASS | PASS | FAIL: English language selector | 0 | 0 |
| event | 1067×800 | en | N/A | PASS | PASS | PASS | N/A | N/A | 0 | 0 |
| event | 1067×800 | es | N/A | PASS | PASS | PASS | PASS | FAIL: English language selector | 0 | 0 |
| calendar | 1280×800 | en | PASS (31/31) | PASS | N/A | PASS | N/A | N/A | 0 | 0 |
| calendar | 1280×800 | es | PASS (31/31) | PASS | N/A | PASS | PASS | FAIL: English language selector | 0 | 0 |
| event | 1280×800 | en | N/A | PASS | PASS | PASS | N/A | N/A | 0 | 0 |
| event | 1280×800 | es | N/A | PASS | PASS | PASS | PASS | FAIL: English language selector | 0 | 0 |

Findings:

- At 390×844, all three secondary Opening-page buttons occupy their own full-width row, in both languages. At 800, 1067, and 1280 px all three share one row.
- Under a literal “no English UI chrome” criterion, Spanish pages fail because the footer language selector is labeled “English”. Other observed UI chrome is translated. Event titles, descriptions, venues, and proper names remain upstream English content and are not treated as UI chrome.
- All 31 calendar cards have exactly one filled RSVP/Confirmar button in every capture. More/Más appears only when the description overflows and links to the corresponding event; no orphan ellipsis control was found.
- All 16 pages have zero page errors and zero images with naturalWidth == 0.
