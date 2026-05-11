# Security Specification: Project Management AI

## 1. Data Invariants
- **User Integrity**: `users/{userId}` documents can only be created/updated by the matching authenticated user.
- **Identity Isolation**: Users cannot read or write data belonging to other users.
- **Subscription Authority (Strict)**: `subscriptionStatus` and `plan` fields are immutable from the client-side. Rules explicitly block these fields during `create` to prevent self-assignment.
- **Progress Validation**: Progress entries must include a valid `moduleId` and are strictly bound to the authenticated user's `uid`.
- **Administrative Override**: Admin access is verified against a secure `/admins/` collection (lookup-based).
- **Backend Authentication**: Sensitive API endpoints (e.g., Stripe session creation) require a valid Firebase ID Token for verification.
- **Infrastructure Protection**: `helmet` headers and `express-rate-limit` are active to mitigate common web attacks.

## 2. The "Dirty Dozen" Payloads (Denial Scenarios)

| ID | Attack Vector | Payload Snippet | Expected Result | Verified |
|----|---------------|-----------------|-----------------|----------|
| D1 | Privilege Escalation (Update) | `{"subscriptionStatus": "active"}` | `PERMISSION_DENIED` | [x] |
| D2 | Privilege Escalation (Create) | `setDoc(users/hacker, { "plan": "Yearly" })` | `PERMISSION_DENIED` | [x] |
| D3 | Identity Spoofing (Firestore) | `setDoc(users/hackerId, { "email": "admin@test.com" })` | `PERMISSION_DENIED` | [x] |
| D4 | Identity Spoofing (API) | `POST /api/create-checkout-session` (no token) | `401 Unauthorized` | [x] |
| D5 | Shadow Field Injection | `{"role": "admin"}` in `users` | `PERMISSION_DENIED` | [x] |
| D6 | Denial of Wallet | Injecting 1MB junk string into `fullName` | `PERMISSION_DENIED` | [x] |
| D7 | Rate Limit Abuse | 1000+ requests per minute to API | `429 Too Many Requests` | [x] |
| D8 | Temporal Anomaly | Sending future `updatedAt` timestamp | `PERMISSION_DENIED` | [x] |
| D9 | Email Hijacking | Updating a user's immutable `email` | `PERMISSION_DENIED` | [x] |
| D10| Brute Force | Attempting to guess Stripe session IDs | Blocked by token verification | [x] |
| D11| PII Scraper | Listing all `users` as a standard user | `PERMISSION_DENIED` | [x] |
| D12| Cross-User Write | User A writing to `progress` of User B | `PERMISSION_DENIED` | [x] |

## 3. Verification Plan
Deploy `firestore.rules` and verify results via the Firebase Emulator or live testing with the following assertions:
- [x] Catch-all deny is active.
- [x] `incoming().diff(existing()).affectedKeys().hasOnly(...)` enforces strict schema.
- [x] Admin bypasses rules for system updates (Stripe webhooks).
