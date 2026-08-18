# Data & security

This page describes the connector's account boundaries, write controls, excluded data, rate
limits and authentication.

---

## One account, enforced by the backend

Every tool filters by the seller ID authorised for the connection. SenPrints enforces this in
the backend rather than relying on the assistant to select the correct account. The filter
applies regardless of the assistant's reasoning or the prompt content.

Requesting a record ID that belongs to another seller returns the same "not found" response as
an ID that does not exist. The response does not reveal whether another seller's order or
campaign exists.

## Read-only unless you say otherwise

26 of 28 tools cannot change anything. The two that can are:

- **Set campaign status** — active ↔ inactive
- **Create or update a blog post** — publishes to your public storefront

Without confirmation, both tools return a preview of the proposed change. They apply a change
only when confirmation is set. Both are marked `destructiveHint` in the protocol, so a
compliant client prompts before applying a change. Neither tool can delete data.

The server checks for confirmation but does not enforce a separate human confirmation round
trip. If your AI client is configured to approve tool calls automatically, it can submit
confirmation on the first call and the change is applied without a separate prompt. Keep
approval manual for this connector if you want the client to show each proposed write before
applying it.

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

Customer results are restricted to the columns shown in your `/customers` dashboard. Order
counts and spend cover **your stores only**, not the buyer's totals across the platform. The
buyer's internal platform trust status is never returned.

## What the connector cannot do

- Reach another seller's data, or any platform-wide or staff-only view.
- Move money: no payout requests, no transfers, no payment-method changes.
- Delete orders, campaigns, customers or stores.
- Read your AI chat history, files or other client-side data. The connector responds to tool
  calls and does not collect data from the client.

## Rate limits

The connector applies two rate limits to constrain automated loops and traffic floods:

- **60 requests per minute per account**, once authenticated.
- **300 requests per minute per IP address**, applied before authentication.

If either limit is exceeded, the connector returns a standard "too many requests" response.
Requests can resume after one minute.

## Transport and authentication

- HTTPS only, streamable HTTP transport.
- OAuth 2.1 with PKCE (S256) and dynamic client registration. Your client registers itself;
  you never create or paste a client secret.
- Access tokens are short-lived and refreshed automatically. Manual tokens last 90 days.
- Tokens are scoped specifically to the MCP connector and cannot be reused with other
  SenPrints APIs.
- Revoke any connection or token instantly from **Settings → MCP** in your dashboard. You do
  not need to change your password.

## What SenPrints records

SenPrints records connector requests in an internal audit log for abuse investigations and
support. The log contents, access and retention are described in
[Privacy](/privacy).

## Reporting a problem

If the connector returns data that does not belong to your account, stop using it and email
**privacy@senprints.com**. Include the question, approximate time and account email. Do not
include tokens.
