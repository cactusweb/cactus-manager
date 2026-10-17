# Design

## Context

The manager dashboard (Angular) consumes the already-deployed backend change `add-user-details` (archived): `GET /owner/@me` now returns `payment.require_user_details`, `PUT /owner` accepts it, and license objects embed `user.email/first_name/last_name/country` (always present, empty string when unfilled). No API work is in this change.

Relevant current structure:

- `PaymentFieldsetComponent` builds an `UntypedFormGroup` (`way`, `currency`); its `_form` getter spreads `...this.form.value` into `payment` for the settings save, and its setter loads via `patchValue({ ...val.payment })`. Sub-fieldsets (`details`, `calls`) are separate modal components.
- `app-checkbox-switcher` is an existing ControlValueAccessor used with `formControlName` elsewhere in settings.
- The license popup grid (`license-viewing.component.html`) renders `app-label` rows, convention `{{ value || "-" }}`; it ends with Description, then Activations; the NFT block sits outside the grid.
- `User` (`licenses/interfaces/user.ts`) is also consumed by ryodan-customization views backed by a different API that does not return the new fields.

## Goals / Non-Goals

**Goals:**

- Toggle that persists/restores `require_user_details` through the existing settings save/load path with zero service changes.
- Buyer detail fields visible in the license popup with the established empty-value convention.

**Non-Goals:**

- Checkout gating UI, details form, country list consumption (user-side storefront app).
- Client-side search over the new fields; `searchLicenseKeys` unchanged.
- Audit-logs UI changes.

## Decisions

1. **Toggle as a `switcher-wrapper` row at the end of the Payment window body** (label + info icon + `app-checkbox-switcher`), matching the visual rhythm of the "Payment details" / "Calls for payment" rows. *Alternative:* head placement like the referral toggle — rejected because that pattern gates the window body, which this toggle does not.

2. **Reactive-form integration via the existing spread.** Add `require_user_details: new UntypedFormControl(false)`; the getter's `...this.form.value` automatically includes it in the `PUT /owner` payload and the setter's `patchValue` restores a stored value. Absent backend value leaves the `false` default. No new request maps or service methods.

3. **Hint as `matTooltip` on an info icon** beside the label ("Buyers must provide email, first and last name, and country before purchase when this is on"). `MatTooltip` is already imported and used in this component (guide-link icon). *Alternative:* static subtext under the row — rejected as vertical noise in a dense window.

4. **License fields as three `app-label`s appended after Activations**, reading `license.user?.first_name / last_name / country` with `|| "-"`. The existing Email label stays on `license.payment.email` (order-time record; the profile may diverge later).

5. **New `User` members are optional** (`email?`, `first_name?`, `last_name?`, `country?`): the interface is shared with ryodan-customization views whose backend does not return these fields, so optional keeps those call sites type-accurate. `Payment.require_user_details` is non-optional (`boolean`) since the manager's own API always returns it.

## Risks / Trade-offs

- [Generic `...form.value` spread could forward unintended fields to `PUT /owner`] → Only one control is added and it is a real backend field; acceptable, and consistent with how the fieldset already works.
- [Older test backend without the field could round-trip `false` over an explicitly-on value] → The manager targets the deployed API that already ships `require_user_details`; runtime behavior is verified during development, not by this change's tasks (verification here is compile-only: `ng build`).
- [Popup grid grows denser] → Accepted per user decision (bottom-of-grid placement); three single-line labels.

## Migration Plan

Frontend-only; deploy any time after the backend change (already live). Rollback = revert the frontend deploy.
