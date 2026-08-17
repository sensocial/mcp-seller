---
title: Home
nav_order: 1
---

# SenPrints Seller Connector

Ask your AI assistant about your SenPrints store in plain English — and get an answer from
your live account, not a guess.

> "How did last week compare to the week before?"
> "Which country is growing fastest for me?"
> "Find the order for maria@example.com and tell me where it is."

The connector links your SenPrints seller account to an AI client you already use — Claude,
ChatGPT, Cursor, or anything else that speaks the Model Context Protocol. Once connected, the
assistant can read your sales, orders, customers, campaigns, payouts and billing, and can
publish blog posts to your storefront when you ask it to.

**Nothing is shared with SenPrints that you do not ask for, and nothing is changed without
your explicit confirmation.** See [Data & security](data-and-security.md).

---

## Start here

| | |
|---|---|
| [Connect in 3 steps](connect.md) | Link your account to Claude, ChatGPT or Cursor |
| [What you can ask](what-you-can-ask.md) | Example questions that work well |
| [Tool reference](tool-reference.md) | All 28 tools, what each one reads or writes |
| [Data & security](data-and-security.md) | What the assistant can see, and what it cannot |
| [Privacy](privacy.md) | What leaves SenPrints, where it goes, how long we keep it |
| [Support](support.md) | When something does not work |

---

## What it is

A hosted MCP server run by SenPrints at `https://api.senprints.com/mcp/seller`. There is
nothing to install and nothing to run on your own machine — you connect to it the same way you
would connect any other remote service, and you sign in with your normal SenPrints seller
login.

Your assistant sees your account and only your account. Every request is filtered server-side
to the seller id the connection was authorised with, so there is no setting to get wrong and
no way for one seller's connector to reach another's data.

## What it is not

- **Not an admin tool.** It cannot see other sellers, platform totals, or anything staff-only.
- **Not a bulk editor.** Of 28 tools, 26 only read. The two that write — publishing a blog
  post, and switching campaigns between active and inactive — always show you exactly what
  they are about to do and wait for you to say yes.
- **Not a payments tool.** It can tell you what your balance and payouts look like. It cannot
  move money, request a payout, or change a payment method.

## Requirements

- An active SenPrints seller account.
- An AI client that supports remote MCP servers over streamable HTTP with OAuth. Claude
  (web, desktop, mobile), ChatGPT, and Cursor all qualify today.
