Live verification of PR #43, 2026-10-06 (Mountain time)

Target: https://cohereboulder.org
Run: https://github.com/Woven-Web/cohereboulder.org/actions/runs/37569736223
Deployment: successful; deployed commit 8fd70f9d06580f0abaceb6b66f4a45d3cbaa75ee.
Live assets match the Actions build log: index-BZhi4z9c.js and index-DstKI9Rw.css.
Before deployment the JavaScript asset was index-BB7O142o.js.

Signed-out Chromium/Playwright coverage: /events, /board, /, /calendar, /register at 390x844, 800x1067, 1067x800, 1280x800, English and Spanish. Spanish selected with the header language button. Full-page screenshots, 390px bottom-of-page viewport screenshots, 800x1067 greyscale copies, and sign-in dialog screenshots included.

PASS: responsive tabs; active Events/Board tab has aria-current=page, weight 700 versus 400, fill and underline. /calendar marks Events active. Home and registration have neither tab active, as expected for those routes.
PASS: signed-out Board is a members-only gate with a solid Join COhere button and no posts.
PASS: 64px single-line header at every size/language; visible controls fit without overlap; document.scrollWidth <= innerWidth in all 40 cases.
PASS: footer content clears the mobile bottom bar by at least 63.75px at scroll end in all ten 390px cases.
PASS: sign-in dialog title in English/Spanish, noreply@cohereboulder.org mentioned, close button works in all eight size/language cases. No form filled or submitted.
PASS: prod sign-in enabled (/api/config regenosLoginEnabled=true), and registration shows Already joined? Sign in / ¿Ya te uniste? Iniciar sesión.
PASS: /calendar and /events/did%3Aplc%3Aw54s52ycbw5lreyhlzexredb/ev-mtka98hjazago4 load; the latter renders COhere Invocation (Opening) 2026 and returns HTTP 200.
PASS: no page errors; no same-origin HTTP 4xx/5xx during the 40-case matrix.

Minor localization issue: Spanish registration form heading remains “Register for COhere Boulder 2026”, while the surrounding content and fields are Spanish. No attribution to PR #43 is claimed.

Raw measurements and request failures are in results.json. Non-GET/HEAD/OPTIONS requests were blocked to enforce read-only browsing; Cloudflare RUM and embedded YouTube telemetry therefore appear as intentional ERR_FAILED requests. The embedded Ecosystem.pdf request is ERR_ABORTED in Chromium, but an independent HTTP GET returns 200. No failed same-origin asset/image HTTP responses were observed. No sign-in, RSVP, registration, signup email, or other production mutation was performed.

Chromium closed unexpectedly after the first 31 cases. The completed first 30 cases were retained and the full 1280px group rerun in a fresh browser. Final results contain exactly 40 matrix cases plus one event detail case.
