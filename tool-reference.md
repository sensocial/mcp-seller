---
title: Tool reference
nav_order: 4
---

# Tool reference

28 tools. **26 read only. 2 write, and both ask you to confirm first.**

Read-only tools are marked `readOnlyHint` in the protocol, so a well-behaved client can run
them without interrupting you. The two write tools are marked `destructiveHint`, so clients
prompt every time.

Every tool is filtered server-side to your own seller account. "Your" below is literal — the
backend does the filtering, not the assistant.

---

## Sales & analytics — 8 tools, all read

| Tool | What it returns |
|---|---|
| Sales overview | Headline KPIs for a window: paid orders, items, sales, profit, AOV, visits, funnel events, refunds, plus live balance |
| Sales chart | Daily time series for sales, visits and each funnel step |
| Compare sales periods | The same KPIs for a window *and* the one before it — this week vs last week, this month vs last month |
| Sales by country | Sales, orders and profit per buyer country, biggest first |
| Sales by device | Sales, orders and visits per device type |
| Sales by store | Sales, orders, profit and visits per store you own |
| Top products | Best-selling template products with items sold, sales and profit |
| Ads breakdown | Sales, orders and profit attributed to ads, grouped by campaign, source, medium or content |

> Campaigns of yours can be cross-listed on the marketplace and on stores you do not own.
> Those rows are folded into a single anonymous **"Other"** bucket — your numbers are counted,
> the other party's store identity is not shown.

## Orders — 3 tools, all read

| Tool | What it returns |
|---|---|
| Search orders | Your orders, filtered by status, payment status, fulfilment status, customer email, order number or date range |
| Get order | One order by id or order number, with its line items |
| Search cancel requests | Cancel requests on your orders |

## Customers — 1 tool, read

| Tool | What it returns |
|---|---|
| Search customers | Buyers who purchased from your stores, by exact email or name substring |

Returns the same columns your dashboard `/customers` list shows: name, email, phone, country,
city, state, the store, and how many orders and how much they spent **with you**. Buyer
credentials, payment-processor ids and platform-wide totals are never returned — see
[Data & security](data-and-security.md).

## Campaigns — 3 tools, 1 writes

| Tool | What it does |
|---|---|
| Search campaigns | Your campaigns, filtered by status, slug or created date |
| Get campaign | One campaign by id or slug, including its pricing and cost fields |
| **Set campaign status** | **Writes.** Switches campaigns between active and inactive |

**Set campaign status** first returns a preview: which campaigns would change and from what to
what, plus anything it refuses (not yours, or blocked by the platform). Only after you say yes
does it apply the change. It cannot delete a campaign, and it cannot touch draft, reviewing or
blocked ones.

## Stores — 2 tools, all read

| Tool | What it returns |
|---|---|
| Search stores | Your stores, by keyword or status |
| Get store | One store by id, domain or sub-domain |

Marketplace connection tokens are never included and webhook URLs are stripped.

## Money — 6 tools, all read

| Tool | What it returns |
|---|---|
| Balance summary | Billing totals grouped by type and status, plus a payout breakdown |
| Search transactions | Sales, commissions, payouts, fees, refunds and topups |
| Search payouts | Your payout queue and history |
| Get payout | One payout by id |
| Search refunds | Payment-gateway refunds on your orders |
| Search topups | Your topup transactions |

Amounts are in USD, the platform settlement currency. Gateway response traces, payout
signatures and raw topup payloads are stripped before anything is returned.

None of these can move money. There is no tool to request a payout or change a payment method.

## Blog & SEO — 4 tools, 1 writes

| Tool | What it does |
|---|---|
| Search blog posts | Your storefront posts, by store, keyword, category or published state |
| Get blog post | One post including its full HTML body |
| Search blog categories | Your categories, so a post can be filed correctly |
| **Create or update a blog post** | **Writes, and publishes to your public storefront** |

**Create or update a blog post** previews what it would save — create or update, the resolved
URL slug, target store, published state, body size — and waits for your yes. On update it
keeps the existing slug unless you give a new one, so a live post's public URL never changes
behind your back. All HTML is sanitised on save, so scripts and event handlers are stripped no
matter what is submitted.

## Account — 1 tool, read

| Tool | What it returns |
|---|---|
| Who am I | The seller id, email, name, currency and timezone this session is bound to |

Worth asking first if you hold more than one SenPrints account.
