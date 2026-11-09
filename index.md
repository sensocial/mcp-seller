# SenPrints Seller Connector

SenPrints prints and ships your print-on-demand orders. If you already use SenPrints, connect your seller account to review weekly sales, track an order or create a campaign from your designs in your AI assistant.

- **New to SenPrints?** [Create a seller account](https://seller.senprints.com/auth/register) or [see how fulfillment works](https://blog.senprints.com/docs/tong-quan-ve-cac-tinh-nang-trong-muc-fulfill-order).
- **Already a seller?** [Connect your AI assistant](/connect).

> "How did last week compare to the week before?"
> "Which country is growing fastest for me?"
> "Find the order for maria@example.com and tell me where it is."

The connector links your SenPrints seller account to Claude, ChatGPT, Cursor, or another AI
client that supports the Model Context Protocol (MCP). Once connected, the assistant can read
your sales, orders, customers, campaigns, stores, payouts and billing. When you ask it to, it
can also create, edit and delete campaigns, create and update stores, place fulfillment orders,
handle order designs and publish blog posts.

Write tools that use confirmation preview the proposed change by default. Starting and confirming an artwork upload write on the first call. A client configured for automatic approval can supply confirmation on its first call. See [Data & security](/data-and-security).

---

## Start here

| | |
|---|---|
| [Connect in 3 steps](/connect) | Link your account to Claude, ChatGPT or Cursor |
| [What you can ask](/what-you-can-ask) | Example questions that work well |
| [Tool reference](/tool-reference) | What each tool reads or writes |
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
- **Write controls.** Review previews before applying changes. No tool deletes an order, customer or store.
- **Payments.** The connector can read balances and payouts. Approving an order’s designs can charge extra print costs to your SenPrints balance. On server versions that expose payment gateway settings, eligible sellers can assign an existing Stripe or PayPal gateway to a store’s checkout. The connector does not return gateway secrets or initiate a checkout payment.

## Requirements

- An active SenPrints seller account.
- An AI client that supports remote MCP servers over streamable HTTP with OAuth. Supported
  clients include Claude (web, desktop and mobile), ChatGPT and Cursor.
