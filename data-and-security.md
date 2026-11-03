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

35 of 57 tools cannot change anything. The 22 that can:

- **Campaigns** — create custom, all-over-print, regular and express campaigns (and express
  templates), edit their details, products, designs and discount codes, duplicate them, switch
  them active ↔ inactive, take them off a collection or store, and delete draft or inactive
  campaigns with no orders
- **Orders** — place a fulfillment order, upload a print file for an order line waiting for a
  design, approve an order's designs (may charge extra print cost to your SenPrints balance)
- **Artwork** — start and confirm an upload to your own media library
- **Stores** — create a store, change its settings, attach a custom domain you own
- **Blog** — create or update a post, which publishes to your public storefront

Without confirmation, every write tool returns a preview of the proposed change. It applies
the change only when confirmation is set. All are marked `readOnlyHint: false`, and the seventeen
that change, remove or publish something are also marked `destructiveHint`, so a
compliant client prompts before applying them. The only deletions are of draft or inactive
campaigns with no orders and of unused discount codes.

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
- Move money: no payout requests, no transfers, no payment-method changes. Approving an
  order's designs can charge its extra print cost to your SenPrints balance, as on the
  dashboard; a fulfillment order is paid for in the dashboard, not by the connector.
- Delete orders, customers or stores, or campaigns that are active or have orders.
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
