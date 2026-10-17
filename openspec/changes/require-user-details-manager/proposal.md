# Proposal

## Why

The backend (archived change `add-user-details`) now stores four user detail fields (`email`, `first_name`, `last_name`, `country`) and enforces a per-owner `require_user_details` checkout gate. The manager dashboard cannot control that toggle or see the collected details, so owners cannot use the feature from this app.

## What Changes

- The Payment settings window gains a **Require user details** toggle switch (with an info tooltip explaining what buyers must fill in). It is saved through the existing `PUT /owner` settings flow and loaded from owner data, defaulting to off.
- The license viewing popup gains **First name**, **Last name**, and **Country** labels at the bottom of its grid, sourced from the license's embedded user object. The existing Email label keeps reading `license.payment.email`.
- The `User` interface gains the four detail fields as optional members.

## Capabilities

### New Capabilities

- `owner-payment-settings`: owner-facing payment configuration, starting with the `require_user_details` toggle — its default, persistence, and in-app explanation.
- `license-viewing`: the license detail popup presentation, starting with displaying the buyer's profile detail fields.

### Modified Capabilities

(none — the project has no specs yet)

## Impact

- `src/app/settings/components/payment-fieldset/` — toggle control + hint markup
- `src/app/account/interfaces/owner.ts` — `Payment.require_user_details`
- `src/app/licenses/interfaces/user.ts` — 4 optional detail fields (shared with ryodan-customization views, so kept optional)
- `src/app/licenses/screens/license-viewing/license-viewing.component.html` — 3 new labels
- No API contract work: the backend is already deployed; this change only consumes existing fields.

Out of scope: checkout gating UI and details form (user-facing storefront app), client-side search over the new fields (`searchLicenseKeys` unchanged), audit-logs UI.
