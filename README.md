# ORBITA — Frontend starter

This is the first responsive frontend foundation for ORBITA, built with React, TypeScript and Vite.

## Run locally
1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Production build
Run `npm run build`. The production output is generated in `dist/`.

## Important status
This package is a frontend starter, not a live messaging service yet. The chat screen currently uses local preview content. It does not yet authenticate users, deliver messages between devices, make calls, store uploads, or provide end-to-end encryption. Those require the Supabase backend, database policies, realtime messaging, storage rules, and a reviewed encryption design before public launch.

## Next development stage
Connect Supabase Auth and PostgreSQL, then implement real conversations and messages with row-level security. Do not expose service-role keys in the browser.
