# Privacy — SenPrints Seller Connector

*Last updated: TBC on publication*

This notice explains what data the **SenPrints Seller Connector** sends when you connect an AI
assistant to your seller account, who receives it and how long SenPrints retains connector
records.

This notice supplements and does not replace the
[SenPrints Privacy Policy](https://senprints.com/page/privacy), which covers the print-on-demand
platform. Where the two overlap, the platform policy governs. This notice covers the connector,
which was not included when the platform policy was written.

---

## The short version

When you connect an AI assistant, you instruct SenPrints to send your business data, including
your buyers' personal information, to the third party you selected. SenPrints does not select
or control the assistant. The provider's privacy policy applies to its handling of the data
after receipt.

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

Fields listed under *What is never returned* in [Data & security](/data-and-security) are
removed before any response leaves SenPrints. That includes buyer credentials, two-factor
secrets, payment-processor identifiers and platform-internal risk data.

## Personal data of your buyers

Orders and customer records contain your buyers' personal data, including names, email
addresses, phone numbers and shipping addresses. When you ask your assistant a question that
touches those records, that personal data is transmitted to the AI provider you connected.

For your storefront's buyer data, you are the controller and SenPrints is your processor. By
connecting an AI assistant, you instruct SenPrints to disclose that data to a further recipient
of your choosing. You are responsible for establishing a lawful basis for the disclosure. If
rules on international transfers or sub-processors apply to you, check that your chosen
assistant meets those requirements before connecting.

Limit requests to the data you need. "Find the order for this email" sends one buyer's details;
"List all my customers" sends many.

## Who receives it

- **The AI provider you connected** — Anthropic, OpenAI, Cursor or another client you chose.
  Their handling is governed by their own terms and privacy policy, not ours.
- **No one else.** SenPrints does not sell connector data, does not use it to train models, and
  does not share it with advertisers or other sellers.

Third-party service providers used by SenPrints to operate the platform are listed in
the [SenPrints Privacy Policy](https://senprints.com/page/privacy).

No additional processor operates the connector or its audit log. The connector and logging
infrastructure are operated by SenPrints.

## What SenPrints stores

SenPrints keeps an internal audit log of connector activity. It records the account, tool,
arguments, response, time, IP address and client user agent. The log is used to investigate
abuse, diagnose support issues and determine which actions the assistant performed.

Because responses are recorded, the log can contain buyer personal data.

**Who can read it.** SenPrints engineering and support staff. You can request entries for your
account at any time. See [Support](/support).

**How long tokens last.** Every connector credential has a fixed lifetime:

| Credential | Lifetime |
|---|---|
| Authorisation code (issued during sign-in, exchanged immediately) | 5 minutes |
| Access token — the credential your assistant sends on each request | 1 hour |
| Refresh token — used to obtain a new access token without signing in again | 90 days |
| Access token you create by hand on the settings page | 90 days |

Revoking a token on the settings page takes effect immediately. Signing out of the connector
in your AI client ends the session.

**How long the audit log is kept.** Entries are held on logging infrastructure operated by
SenPrints under the same retention rules as the platform's other operational logs. They are
used only for security review and support. To obtain the current retention period or request
removal of your account's entries, email privacy@senprints.com.

SenPrints does not store your AI conversations. It receives individual tool calls from the
assistant, not the surrounding chat.

## Your controls

- **Revoke at any time.** **Settings → MCP** in your seller dashboard lists every connection
  and token. Revocation takes effect immediately and prevents further access through that
  credential.
- **Manual tokens expire after 90 days** and are capped at five per account; issuing a sixth
  revokes the oldest automatically.
- **Deletion requests.** To request deletion of connector audit records relating to your
  account, email **privacy@senprints.com**. Deletion of your SenPrints account itself is
  covered by the platform policy.
- **Your buyers' rights** — access, correction, deletion — are handled as they are for the rest
  of the platform; see the [SenPrints Privacy Policy](https://senprints.com/page/privacy).

## Children

The connector is intended for SenPrints sellers and is not directed at anyone under 18.

## Changes

SenPrints will announce material changes to this notice in the seller dashboard before they
take effect. The date at the top identifies the current version.

## Contact

Email **privacy@senprints.com** for privacy questions, deletion requests or questions about
this notice.

For suspected data exposure through the connector, email the same address with the question
and approximate time. Do not include access tokens.
