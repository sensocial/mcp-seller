# What you can ask

You do not need to specify tool names. Ask a question about your seller account, and the
assistant selects the relevant tool. The examples below are common seller questions grouped
by task.

---

## How am I doing?

- *"How were sales last month?"*
- *"Compare this week to last week."*
- *"What's my average order value this quarter?"*
- *"Show me daily sales for the last 30 days."*

The assistant answers from your account data, including paid orders, items, sales, profit,
average order value (AOV), visits and funnel steps between a visit and a paid order.

## Where are my sales coming from?

- *"Which countries are growing fastest for me?"*
- *"Do people buy more on mobile or desktop?"*
- *"Which of my stores made the most money this month?"*
- *"Which ad campaign actually converted?"*

## Chasing a specific order

- *"Find the order for maria@example.com."*
- *"What's the status of order SP-12345?"*
- *"Any cancel requests waiting on me?"*
- *"Were there refunds this week, and why?"*

## Money

- *"What's my balance?"*
- *"How much have I earned this month?"*
- *"When was my last payout and what state is it in?"*
- *"Break down my transactions by type for October."*

## Products and campaigns

- *"Which products sold best this month?"*
- *"List my active campaigns."*
- *"Show me campaign 'summer-tee'."*
- *"Deactivate these three campaigns."* — previews the change by default and applies it when
  confirmation is set

## Storefront blog

- *"What blog posts do I have on store X?"*
- *"Write a post about caring for printed hoodies and publish it to my main store."*
  — previews the target, state, slug and body size by default, then saves when confirmation is
  set

Both write tools are marked `destructiveHint`. A compliant client prompts before applying a
change, but the server does not require a separate human confirmation round trip. A client
configured for automatic approval can submit confirmation on its first call.

---

## Getting better answers

**Name the window.** "Last month" and "the last 30 days" cover different periods and can
produce different results. The assistant uses your account timezone.

**Name the store** if you have several. Otherwise, the result covers all of them.

**Ask for the reason, not just the number.** "Sales dropped last week; what changed?" asks the
assistant to compare periods, countries, devices and stores to identify where the decline
occurred.

**Check the account first if you have more than one.** Ask *"Which account am I connected
to?"* before requesting account data. This check takes a second and helps avoid querying the
wrong account.

---

## What it will not do

- Show you another seller's data, platform totals, or anything staff-only.
- Move money, request a payout, or change a payment method.
- Apply a write without confirmation set. Without confirmation, the tool returns a preview.
  With automatic client approval, confirmation can be supplied on the first call.
- Delete a campaign or an order. It can only switch campaigns between active and inactive.
