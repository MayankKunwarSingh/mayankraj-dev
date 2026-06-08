# Database

The project is scaffolded for Firebase because it is fast to host globally, simple for recruiter demos, and works well with Next.js.

Recommended collections:

- `visitors`: anonymous visit events, country, referrer, timestamp
- `contacts`: contact form backup records
- `chat_sessions`: optional AI assistant transcripts
- `projects`: editable project metadata
- `certifications`: certification records

The frontend Firebase client is in:

`frontend/src/lib/firebase.ts`

## Firebase Setup

1. Create a Firebase project.
2. Add a Web App.
3. Copy the config values into `frontend/.env.local`.
4. Enable Firestore.
5. Enable Firebase Auth if you want a protected analytics dashboard.
6. Deploy rules from `database/firestore.rules`.
