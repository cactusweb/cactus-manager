# Spec Delta

## Purpose

Presentation of an individual license in the manager dashboard. This change introduces display of the buyer's profile detail fields in the license popup.

## ADDED Requirements

### Requirement: Buyer detail fields in license popup

The license popup SHALL display the buyer's name (first name and last name combined into one value) and country from the license's embedded user data, below the existing popup fields.

#### Scenario: Details are populated

- **WHEN** a license is opened whose user has first name, last name, and country filled
- **THEN** the popup shows the combined name and the country, each in its own labeled field at the bottom of the grid

#### Scenario: Only part of the name is filled

- **WHEN** a license is opened whose user has only a first name or only a last name
- **THEN** the name field shows the filled part alone, without extra spacing

#### Scenario: Details are empty or missing

- **WHEN** a license is opened whose user data lacks a detail value
- **THEN** the corresponding field shows a placeholder dash instead of blank space

#### Scenario: License has no user

- **WHEN** a license is opened that has no embedded user
- **THEN** both detail fields show the placeholder dash

### Requirement: License email source

The popup's Email field SHALL continue to show the email from the license's own payment record, not from the buyer's current profile.

#### Scenario: Profile email differs from order email

- **WHEN** a license is opened whose payment record email differs from the buyer's current profile email
- **THEN** the Email field shows the payment record email
