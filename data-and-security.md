---
title: Data & security
nav_order: 5
---

# Data & security

How the connector is bounded, in the order that matters.

---

## One account, enforced by the backend

Every tool filters on the seller id the connection was authorised with. That filtering happens
in SenPrints' backend, not in the assistant's reasoning — so it holds even if the assistant is
confused, or if someone tries to talk it into looking elsewhere.

Asking for a record by id that belongs to someone else returns exactly the same "not found"
you get for an id that does not exist. The two are deliberately indistinguishable, so the
connector cannot be used to discover whether another seller's order or campaign exists.

## Read-only unless you say otherwise

26 of 28 tools cannot change anything. The two that can are:

- **Set campaign status** — active ↔ inactive
- **Create or update a blog post** — publishes to your public storefront

Both run a preview first, showing exactly what would change, and only act after you confirm.
Both are declared destructive in the protocol, so clients prompt every time rather than
running them silently. Neither can delete anything.

## What is never returned

Some fields are removed before any response leaves SenPrints, regardless of which tool asked:

| Removed | Why |
|---|---|
| Buyer passwords and two-factor secrets | Credentials. A 2FA secret would let anyone generate valid codes indefinitely. |
| Payment-processor customer ids | Identifies the buyer inside Stripe. |
| Buyer balances, holds and loyalty points | Money we hold for the buyer; not seller-facing. |
| Internal staff assignments, risk flags and notes | Platform-internal, with no equivalent anywhere in the seller product. |
| Payout signatures, gateway response traces, raw topup payloads | Contain gateway internals and sometimes account details. |
| Marketplace connection tokens and webhook URLs | Credentials for connected storefronts. |

Customer results are also restricted to the exact columns your own `/customers` dashboard
shows. In particular, the order count and spend you see are **with your stores only** — not
the buyer's totals across the rest of the platform — and the platform's internal trust status
for a buyer is never exposed.

## What the connector cannot do

- Reach another seller's data, or any platform-wide or staff-only view.
- Move money: no payout requests, no transfers, no payment-method changes.
- Delete orders, campaigns, customers or stores.
- Read your AI chat history, your files, or anything else in your assistant. The connector
  answers questions; it does not collect from the client side.

## Rate limits

Two ceilings, so a runaway loop or a flood cannot degrade the service:

- **60 requests per minute per account**, once authenticated.
- **300 requests per minute per IP address**, applied before authentication.

Over either, you get a standard "too many requests" and can continue a minute later.

## Transport and authentication

- HTTPS only, streamable HTTP transport.
- OAuth 2.1 with PKCE (S256) and dynamic client registration. Your client registers itself;
  you never create or paste a client secret.
- Access tokens are short-lived and refreshed automatically. Manual tokens last 90 days.
- Tokens are scoped to the MCP connector specifically — one cannot be reused against other
  SenPrints APIs.
- Revoke any connection or token instantly from **Settings → MCP** in your dashboard. You do
  not need to change your password.

## What SenPrints records

Connector requests are written to an internal audit log so we can investigate abuse and
support problems. What that log holds, who can read it and how long it is kept is described in
[Privacy](privacy.md).

## Reporting a problem

If you believe the connector returned data that is not yours, stop using it and email
**privacy@senprints.com** with the question you asked and roughly when. Include the account
email. Do not include tokens.
