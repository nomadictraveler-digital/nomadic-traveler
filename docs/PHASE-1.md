# Phase 1 — Core platform

Blueprint-aligned first milestone:

- Users table and account status field
- Profile table linked one-to-one with users
- Roles table and user-role pivot for staff/member permissions
- Seeded blueprint roles: member, premium member, visa officer, flight agent, hotel agent, support agent, content editor, accountant, community manager and super admin
- Next tasks: finish the full official Laravel 12 skeleton, add Breeze auth, implement policy/middleware checks, profile edit screens, admin dashboard, tests and deployment pipeline.

Privacy note: passport number, NID, bank details and visa documents are intentionally not part of the public profile schema. They belong in separate private, access-controlled document modules.
