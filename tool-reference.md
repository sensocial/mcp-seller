# Tool reference

The connector provides 28 tools: **26 are read-only and 2 can write. Both write tools return a
preview by default and apply a change only when confirmation is set.**

Read-only tools are marked `readOnlyHint` in the protocol, so a compliant client can run them
without prompting. The two write tools are marked `destructiveHint`, so a compliant client
prompts before applying a change. The server does not enforce a separate human confirmation
round trip; a client configured for automatic approval can send confirmation on its first
call.

Every tool is filtered server-side to the seller account authorised for the connection.
References to "your" data below mean data filtered by the backend, not by the assistant.

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

> Your campaigns can be cross-listed on the marketplace and on stores you do not own. Those
> rows are combined in an anonymous **"Other"** bucket. Your figures are included, but the
> other party's store identity is not returned.

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

This tool returns the same columns shown in the dashboard `/customers` list: name, email,
phone, country, city, state, store, and the number and value of orders placed **with you**.
Buyer credentials, payment-processor IDs and platform-wide totals are never returned. See
[Data & security](/data-and-security).

## Campaigns — 3 tools, 1 writes

| Tool | What it does |
|---|---|
| Search campaigns | Your campaigns, filtered by status, slug or created date |
| Get campaign | One campaign by id or slug, including its pricing and cost fields |
| **Set campaign status** | **Writes.** Switches campaigns between active and inactive |

Without confirmation, **Set campaign status** returns a preview showing which campaigns would
change, their current and proposed states, and any campaigns it refuses because they do not
belong to you or are blocked by the platform. It applies the change only when confirmation is
set. A compliant client prompts before applying, but automatic approval can submit
confirmation on the first call. The tool cannot delete a campaign or change campaigns in
draft, reviewing or blocked states.

## Stores — 2 tools, all read

| Tool | What it returns |
|---|---|
| Search stores | Your stores, by keyword or status |
| Get store | One store by id, domain or sub-domain |

Marketplace connection tokens are never included, and webhook URLs are removed.

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
signatures and raw topup payloads are removed before a response is returned.

These tools cannot move money. The connector has no tool to request a payout or change a
payment method.

## Blog & SEO — 4 tools, 1 writes

| Tool | What it does |
|---|---|
| Search blog posts | Your storefront posts, by store, keyword, category or published state |
| Get blog post | One post including its full HTML body |
| Search blog categories | Your categories, so a post can be filed correctly |
| **Create or update a blog post** | **Writes, and publishes to your public storefront** |

Without confirmation, **Create or update a blog post** previews whether it would create or
update a post, the resolved URL slug, target store, published state and body size. The preview
reports the body size, not the full body content. The tool saves only when confirmation is set;
automatic client approval can submit confirmation on the first call. On update, it retains the
existing slug unless you provide a new one. All HTML is sanitised when saved, so scripts and
event handlers are removed from submitted content.

## Account — 1 tool, read

| Tool | What it returns |
|---|---|
| Who am I | The seller id, email, name, currency and timezone this session is bound to |

Use this tool first if you have more than one SenPrints account.
