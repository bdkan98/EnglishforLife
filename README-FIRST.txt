KANDD LEARNING — LESSONS 1–4 NO CONTRACTIONS + SITE-WIDE TRANSLATOR

Upload these files to the existing GitHub Pages repository, preserving paths:
  lessons/lesson1.html
  lessons/lesson2.html
  lessons/lesson3.html
  lessons/lesson4.html
  site-nav.js
  translator.html

Only these six files are included. The other lessons, teacher dashboard, and stylesheets remain untouched.

Lesson text and quiz strings were expanded to remove common contractions; answer keys and the number of questions are unchanged. For example, "I'm" becomes "I am" and "What's" becomes "What is". This applies to displayed phrases, option values, and speaking text.

The translator is linked in the existing site-wide sidebar for students and teachers. It translates Spanish ↔ English using the public third-party MyMemory API (internet connection required). The API is rate-limited and not guaranteed to be continuously available. Text is transmitted to MyMemory; do not use for private data. No Supabase changes or API key are required.

TEST AFTER DEPLOY:
1. Hard-refresh Ctrl+Shift+R; verify new Translator sidebar link on homepage, lessons, and teacher dashboard.
2. Spanish→English and English→Spanish translation; switch directions, copy, and clear.
3. Lessons 1–4 show no contractions in dialogues, speaking phrases, dropdown choices, and Quick Checks.
4. Verify quiz answers grade correctly and Match It works; verify lesson completion is retained.
5. Check sidebar role-specific visibility, sign-in, and teacher dashboard.

JavaScript syntax and ZIP integrity checked locally; external translation API and deployed site were NOT tested live.
