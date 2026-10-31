KANDD LEARNING — NAVIGATION INTERACTION AND ICONS
Upload site-nav.js and kandd-sidebar-behavior.css to the repository ROOT. Keep other files unchanged.

- My Learning: document/checklist icon
- Pronunciation Helper: speaker/sound icon
- Spanish ↔ English Translator: translation/language icon
- Floating pronunciation launcher remains speaker; floating translator remains globe.
- Hover over a collapsed sidebar link: only that item's text tooltip appears; full menu does not expand and page does not move.
- Hamburger opens/closes the full sidebar; expanded menu overlays the page instead of pushing it.
- Mobile hamburger-opened menu remains open until the hamburger is clicked again, a link is selected, or the user taps outside. Escape also closes it.
- Other navigation/auth features retained.

TEST: desktop collapsed hover over each icon; hamburger open/close; mobile hamburger stays open longer than 3.5 seconds; outside tap closes; lesson and teacher links work; floating tools remain functional.

NOTE: This deliberately replaces the previous automatic mobile 3.5-second collapse with persistent explicit hamburger opening, per the latest request. No Supabase changes.
