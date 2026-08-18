# SenPrints Seller Connector

Use your AI assistant to ask questions about your SenPrints store in plain English. The
connector answers with data from your SenPrints seller account.

> "How did last week compare to the week before?"
> "Which country is growing fastest for me?"
> "Find the order for maria@example.com and tell me where it is."

The connector links your SenPrints seller account to Claude, ChatGPT, Cursor, or another AI
client that supports the Model Context Protocol (MCP). Once connected, the assistant can read
your sales, orders, customers, campaigns, payouts and billing. It can also publish blog posts
to your storefront when instructed.

**Of the 28 tools, 26 are read-only. The two write tools return a preview by default and apply
a change only when confirmation is set. They are marked `destructiveHint`, so a compliant
client prompts before applying a change. The server does not require a separate human round
trip: a client configured for automatic approval can submit confirmation on its first call.**
See [Data & security](/data-and-security).

---

## Start here

| | |
|---|---|
| [Connect in 3 steps](/connect) | Link your account to Claude, ChatGPT or Cursor |
| [What you can ask](/what-you-can-ask) | Example questions that work well |
| [Tool reference](/tool-reference) | All 28 tools, what each one reads or writes |
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
- **Not a bulk editor.** Of 28 tools, 26 are read-only. The two write tools publish a blog post
  or switch campaigns between active and inactive. They preview by default and apply only when
  confirmation is set; automatic client approval can provide confirmation on the first call.
- **Not a payments tool.** It can tell you what your balance and payouts look like. It cannot
  move money, request a payout, or change a payment method.

## Requirements

- An active SenPrints seller account.
- An AI client that supports remote MCP servers over streamable HTTP with OAuth. Supported
  clients include Claude (web, desktop and mobile), ChatGPT and Cursor.
