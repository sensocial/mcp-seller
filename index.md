# SenPrints Seller Connector

Use your AI assistant to ask questions about your SenPrints store in plain English. The
connector answers with data from your SenPrints seller account.

> "How did last week compare to the week before?"
> "Which country is growing fastest for me?"
> "Find the order for maria@example.com and tell me where it is."

The connector links your SenPrints seller account to Claude, ChatGPT, Cursor, or another AI
client that supports the Model Context Protocol (MCP). Once connected, the assistant can read
your sales, orders, customers, campaigns, stores, payouts and billing. When you ask it to, it
can also create campaigns and stores, place fulfillment orders, handle order designs and
publish blog posts.

**Of the 48 tools, 33 are read-only. The 15 write tools return a preview by default and apply
a change only when confirmation is set. They are marked `readOnlyHint: false`, and the ones
that change something already there are also marked `destructiveHint`, so a compliant client
prompts before applying them. The server does not require a separate human round trip: a
client configured for automatic approval can submit confirmation on its first call.**
See [Data & security](/data-and-security).

---

## Start here

| | |
|---|---|
| [Connect in 3 steps](/connect) | Link your account to Claude, ChatGPT or Cursor |
| [What you can ask](/what-you-can-ask) | Example questions that work well |
| [Tool reference](/tool-reference) | All 48 tools, what each one reads or writes |
| [Data & security](/data-and-security) | What the assistant can see, and what it cannot |
| [Privacy](/privacy) | What leaves SenPrints, where it goes, how long we keep it |
| [Support](/support) | When something does not work |

---

## What it is

The connector is a hosted MCP server operated by SenPrints at
`https://api.senprints.com/mcp/seller`. You do not need to install or run software locally.
Connect it as a remote service and sign in with your SenPrints seller credentials.

Every request is filtered server-side by the seller ID authorised for the connection. The
connector does not require a client-side account-filtering setting, and one seller's
connection cannot access another seller's data.

## What it is not

- **Not an admin tool.** It cannot see other sellers, platform totals, or anything staff-only.
- **Not unattended.** Every write previews by default and applies only when confirmation is
  set; automatic client approval can provide confirmation on the first call. No tool deletes an
  order, campaign, customer or store.
- **Not a payments tool.** It can tell you what your balance and payouts look like. It cannot
  request a payout, transfer money, or change a payment method. The only charge a tool can
  cause is the extra print cost when you approve an order's designs, taken from your SenPrints
  balance as on the dashboard.

## Requirements

- An active SenPrints seller account.
- An AI client that supports remote MCP servers over streamable HTTP with OAuth. Supported
  clients include Claude (web, desktop and mobile), ChatGPT and Cursor.
