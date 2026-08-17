---
title: Privacy
nav_order: 6
---

# Privacy — SenPrints Seller Connector

*Last updated: TBC on publication*

This notice covers the **SenPrints Seller Connector** specifically: what data leaves SenPrints
when you connect an AI assistant to your seller account, where it goes, and how long we keep
records of it.

It sits alongside — and does not replace — the
[SenPrints Privacy Policy](https://senprints.com/page/privacy), which covers the print-on-demand
platform itself. Where the two overlap, the platform policy governs; this notice adds the part
the platform policy does not describe, because the connector did not exist when it was written.

---

## The short version

When you connect an AI assistant, **you** are choosing to send your SenPrints business data —
including your buyers' personal information — to a third party you selected. SenPrints
transmits that data at your request. We do not choose the assistant, we do not control what it
does with the data afterwards, and its own privacy policy applies from the moment the data
arrives.

---

## What data the connector can access

Only data belonging to your own seller account:

| Category | Includes |
|---|---|
| Sales and analytics | Order counts, revenue, profit, visits, funnel events, by day / country / device / store / ad campaign |
| Orders | Order records and line items, statuses, and the buyer name, email, phone and address attached to them |
| Customers | Buyers who purchased from your stores: name, email, phone, country, city, state, and their order count and spend **with your stores** |
| Campaigns | Your campaign records, including pricing and cost fields |
| Stores | Your storefront records |
| Billing | Transactions, payouts, refunds, topups, balance |
| Blog | Your storefront blog posts and categories |

Fields listed under *What is never returned* in [Data & security](data-and-security.md) are
removed before any response leaves SenPrints. That includes buyer credentials, two-factor
secrets, payment-processor identifiers and platform-internal risk data.

## Personal data of your buyers

This is the part that deserves your attention.

Orders and customer records contain your buyers' personal data — names, email addresses, phone
numbers and shipping addresses. When you ask your assistant a question that touches those
records, that personal data is transmitted to the AI provider you connected.

**In data-protection terms:** for your storefront's buyer data you are the controller and
SenPrints is your processor. When you connect an AI assistant, you are instructing us to
disclose that data to a further recipient of your choosing, and you are responsible for having
a lawful basis to do so. If you operate in a jurisdiction with rules on international transfers
or sub-processors, check that your chosen assistant satisfies them before connecting.

Practical advice: ask for what you need. "Find the order for this email" sends one buyer's
details. "List all my customers" sends many.

## Who receives it

- **The AI provider you connected** — Anthropic, OpenAI, Cursor, or whichever client you chose.
  Their handling is governed by their own terms and privacy policy, not ours.
- **No one else.** SenPrints does not sell connector data, does not use it to train models, and
  does not share it with advertisers or other sellers.

The third-party service providers SenPrints itself uses to operate the platform are listed in
the [SenPrints Privacy Policy](https://senprints.com/page/privacy).

No additional processor is involved in operating the connector or its audit log. The connector
runs on SenPrints' own infrastructure, and its audit log is written to logging infrastructure
SenPrints operates.

## What SenPrints stores

We keep an internal audit log of connector activity: which account made the request, which
tool was called, the arguments, the response, and the time, IP address and client user agent.
We keep it to investigate abuse, diagnose support issues, and answer "what did the assistant
actually do" when you ask.

Because the log records responses, it can contain buyer personal data.

**Who can read it.** SenPrints engineering and support staff. You can request the entries for
your own account at any time — see [Support](support.md).

**How long tokens last.** Every credential the connector issues expires on its own:

| Credential | Lifetime |
|---|---|
| Authorisation code (issued during sign-in, exchanged immediately) | 5 minutes |
| Access token — the credential your assistant sends on each request | 1 hour |
| Refresh token — used to obtain a new access token without signing in again | 90 days |
| Access token you create by hand on the settings page | 90 days |

Revoking a token on the settings page takes effect immediately, and signing out of the
connector in your AI client ends the session.

> **To be completed before publication:** the retention period for audit log entries.

We do not store your AI conversations. SenPrints only ever sees the individual tool calls your
assistant makes, never the surrounding chat.

## Your controls

- **Revoke at any time.** **Settings → MCP** in your seller dashboard lists every connection
  and token. Revoking takes effect immediately, and no further data can leave.
- **Manual tokens expire after 90 days** and are capped at five per account; issuing a sixth
  revokes the oldest automatically.
- **Deletion requests.** To request deletion of connector audit records relating to your
  account, email **privacy@senprints.com**. Deletion of your SenPrints account itself is
  covered by the platform policy.
- **Your buyers' rights** — access, correction, deletion — are handled as they are for the rest
  of the platform; see the [SenPrints Privacy Policy](https://senprints.com/page/privacy).

## Children

The connector is a business tool for SenPrints sellers and is not directed at anyone under 18.

## Changes

Material changes to this notice will be announced in the seller dashboard before they take
effect. The date at the top always reflects the current version.

## Contact

**privacy@senprints.com** — privacy questions, deletion requests, and anything about this
notice.

For a suspected data-exposure problem in the connector, email the same address and include the
question you asked and roughly when. Do not include access tokens.
