# Spec Delta

## Purpose

Owner-facing configuration of payment behavior in the manager dashboard. This change introduces control over whether buyers must submit user details at checkout.

## ADDED Requirements

### Requirement: Require user details toggle

The Payment settings window SHALL expose a "Require user details" switch that the owner can turn on or off, persisted with the rest of the payment settings. When the owner's stored setting is absent, the switch SHALL be off.

#### Scenario: Setting absent defaults to off

- **WHEN** owner payment settings are loaded and contain no `require_user_details` value
- **THEN** the switch is displayed in the off position

#### Scenario: Turning the switch on and saving

- **WHEN** the owner turns the switch on and saves settings
- **THEN** the saved payment settings include `require_user_details: true`

#### Scenario: Turning the switch off and saving

- **WHEN** the owner turns the switch off and saves settings
- **THEN** the saved payment settings include `require_user_details: false`

#### Scenario: Saved state is restored

- **WHEN** the owner reopens settings after saving the switch in a given position
- **THEN** the switch is displayed in the saved position

### Requirement: Toggle explanation

The "Require user details" switch SHALL present an explanation of what the setting means for buyers, visible without leaving the Payment window.

#### Scenario: Owner views the hint

- **WHEN** the owner reveals the explanation next to the switch
- **THEN** it states that buyers must provide email, first name, last name, and country before purchase when the setting is on
