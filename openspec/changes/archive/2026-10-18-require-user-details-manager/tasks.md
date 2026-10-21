# Tasks

## 1. Payment settings toggle

- [x] 1.1 Add `require_user_details: boolean` to the `Payment` interface in `src/app/account/interfaces/owner.ts` and verify the project still compiles (`ng build`)
- [x] 1.2 Add a `require_user_details` control (default `false`) to the payment fieldset form in `src/app/settings/components/payment-fieldset/payment-fieldset.component.ts` and verify `ng build` passes; no service or request-map changes expected
- [x] 1.3 Add the "Require user details" switcher row (label + info icon with `matTooltip` hint + `app-checkbox-switcher`) at the end of the fieldset body in `payment-fieldset.component.html` and verify the row matches the existing "Payment details" / "Calls for payment" rhythm visually

## 2. License popup detail fields

- [x] 2.1 Add optional `email`, `first_name`, `last_name`, `country` to `User` in `src/app/licenses/interfaces/user.ts` and verify `ng build` passes (ryodan-customization usages stay type-clean)
- [x] 2.2 Append a "Name" `app-label` (combined `license.user?.first_name` + `last_name` via a `getUserFullName()` helper) and a "Country" `app-label` (`license.user?.country || "-"`) side by side after the Activations label in `src/app/licenses/screens/license-viewing/license-viewing.component.html`, and verify the existing Email label still reads `license.payment.email`

## 3. Build verification

- [x] 3.1 Run `ng build` and fix any compile errors; confirm the only changed files are those listed in tasks 1–2 (no backend or runtime verification — that happens during development)
