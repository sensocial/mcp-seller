# Tool reference

Tools shown by your client depend on the server version and your account permissions. Write tools that use confirmation preview the proposed change by default. Starting and confirming an artwork upload write on the first call.

Read-only tools advertise `readOnlyHint`. Write tools advertise `readOnlyHint: false` and indicate destructive actions with `destructiveHint`. Review previews in your client before applying changes.

Every tool is filtered server-side to the seller account authorised for the connection.
References to "your" data below mean data filtered by the backend, not by the assistant.

---

## Sales & analytics

| Tool | What it returns |
|---|---|
| Sales overview | Headline KPIs for a window: paid orders, items, sales, profit, AOV, visits, funnel events, refunds, plus live balance; optionally compared with the window before it |
| Sales chart | Daily time series for sales, visits and each funnel step |
| Sales breakdown | Sales, orders and profit split by one dimension: country, device, store, product, or ads campaign, source or medium |
| Campaign sales | Your best-selling campaigns for a window, and totals for every campaign whose title contains a keyword |
| Campaign funnel by day | Views, add-to-carts, checkouts, orders, items and sales per day for up to 30 of your campaigns, so an ad set can be matched against the store day by day (up to 62 days per call; about the last 6 months) |
| Contest SenPoints | Your points in the latest SenPrints contest, its reward tiers and how far the next tier is |

> Your campaigns can be cross-listed on the marketplace and on stores you do not own. Those
> rows are combined in an anonymous **"Other"** bucket. Your figures are included, but the
> other party's store identity is not returned.

## Orders

| Tool | What it does |
|---|---|
| Search orders | Your store orders or fulfillment orders, filtered by status, payment, fulfilment, customer email, order number, store, campaign or date |
| Get order | One order by id or order number, with its line items |
| Get order visit log | The storefront journey that ended in one of your orders: pages viewed, clicks, where the session stopped |
| Search cancel requests | Cancel requests on your orders |
| Search abandoned orders | Unpaid carts, with what the buyer was about to pay and which recovery messages were sent |
| Search orders waiting for a design | Orders whose lines wait in `designing` because a custom campaign launched without print files |
| **Upload a design for an order line** | **Writes.** Sets the print file for one print space of a waiting line; it also applies to later orders of that product |
| **Approve the designs of an order** | **Writes.** Releases a waiting order to fulfilment. A product printed on more than one print space is charged its extra print cost to your SenPrints balance |
| **Create fulfillment order** | **Writes.** Places one fulfillment order that SenPrints prints and ships to the address given. Payment for it happens in the seller dashboard |

The fulfillment-order preview resolves each line against the catalog and reports the variant,
an indicative base cost, and every blocking error or warning before anything is created.

## Artwork & catalog

| Tool | What it does |
|---|---|
| Search the SenPrints product catalog | Products you can sell or fulfill, by product type or name, with their lowest base cost |
| Read one SenPrints catalog product | Base cost per region and variant, shipping cost and time, print file sizes and print spaces |
| List campaign templates | Blank products a campaign can be sold on, with print spaces and the accepted price range |
| Search fulfillment media | Artwork and mockups already in your media library |
| **Start an artwork upload** | **Writes.** Reserves a path in your storage and returns a 30-minute upload link, so the file never passes through the chat |
| **Confirm an artwork upload** | **Writes.** Checks the uploaded file arrived and is fit to print, then adds it to your media library |

## Campaigns

| Tool | What it does |
|---|---|
| Search campaigns | Your campaigns, filtered by status, keyword, store, type or created date |
| Get campaign | One campaign by id or slug, including its pricing and cost fields |
| Preview a campaign for a country | What a buyer in one country sees: price and currency per variant, whether it can be bought there and why not, and the shipping methods and fees the checkout offers |
| **Set campaign status** | **Writes.** Switches campaigns between active and inactive |
| **Take campaigns off a collection or store** | **Writes.** Removes the listing links; the campaigns stay active and keep their URL |
| **Create custom campaigns** | **Writes.** Up to 20 campaigns per call from your own mockup photos |
| **Create all-over-print campaigns** | **Writes.** Up to 20 campaigns per call, one design printed over the whole product |
| **Create regular campaigns** | **Writes.** Up to 20 campaigns per call, print designs placed on products the way the dashboard editor places them |
| **Create an express template** | **Writes.** The product set (templates, prices, colors) that express campaigns sell |
| **Create express campaigns** | **Writes.** Up to 20 campaigns per call from one express template, one design each |
| **Create Layerkit campaigns** | **Writes.** Create campaigns from your Layerkit templates for buyer personalization. |
| **Edit campaigns** | **Writes.** Up to 20 per call: title, description, slug, collections, stores, end time and countdown, tracking pixels, marketplace listing and default product, as on the dashboard’s campaign edit page |
| **Edit campaign products** | **Writes.** Up to 20 campaigns per call: price within the template’s range, compare-at price, colors, default color and options, as on the dashboard’s pricing tab |
| **Change campaign designs** | **Writes.** Up to 20 campaigns per call: new or removed designs and mockups, and products that need artwork, where the dashboard allows it. A launched regular campaign is sent back to draft first, as the dashboard’s “Edit design” does |
| **Manage a campaign’s discount codes** | **Writes.** Lists, creates, edits, switches on or off and removes the discount codes of one campaign. Only a code that has not been used can be edited or removed |
| **Duplicate campaigns** | **Writes.** Up to 20 per call, into new draft campaigns, optionally with copies of the designs. Every copy counts against the 24-hour campaign limit |
| **Delete campaigns** | **Writes.** Up to 50 per call. Only draft or inactive campaigns with no orders, and not express templates. A deleted campaign leaves the storefronts and cannot be restored |

Without confirmation, every campaign write returns a preview listing exactly what would be
created or changed, and anything refused because it does not belong to you or fails a check
(price range, print size, trademark). Batch creation sends the preview's hash back on
confirmation, so a confirmed call cannot create something different from what was previewed.
Only **Delete campaigns** removes a campaign, and only a draft or inactive one with no orders.

## Collections

| Tool | What it does |
|---|---|
| Search collections | Find your collections or read their campaigns, SEO and banners. |
| **Manage collections** | **Writes.** Create, edit or remove a collection you own. |

## Customers

| Tool | What it returns |
|---|---|
| Search customers | Buyers who purchased from your stores, by name or email, store, country or order count |

This tool returns the same columns shown in the dashboard `/customers` list: name, email,
phone, country, city, state, store, and the number and value of orders placed **with you**.
Buyer credentials, payment-processor IDs and platform-wide totals are never returned. See
[Data & security](/data-and-security).

## Stores & team

| Tool | What it does |
|---|---|
| Search stores | Your stores, by keyword or status |
| Get store | One store by id, domain or sub-domain |
| List store custom domains | The custom domains on your stores and their activation state |
| Search team members | Members of your seller team, their role and which stores they may work on (account owner only) |
| **Create a store** | **Writes.** Opens a new storefront on a SenPrints sub-domain |
| **Update a store** | **Writes.** Tracking ids (Facebook, TikTok, Google, Pinterest, Snapchat, Bing, Reddit, Quora, Klaviyo), default currency, theme, logo and featured collection. The preview shows each field before and after |
| **Add a custom domain to a store** | **Writes.** Attaches a domain you own and returns the DNS record to add; at most 5 per account per 24 hours |
| Get store UI widgets | Read the banners, collection grids and other widgets on a store’s pages. |
| **Set store UI widgets** | **Writes.** Replace the widget list of a store page. Widgets omitted from the list are removed. |
| List payment gateways | Read the account’s existing Stripe and PayPal gateway configuration and the stores that use it. Gateway secrets are excluded. |

Marketplace connection tokens are never included, and webhook URLs are removed. On server versions that expose payment gateway settings, eligible sellers can assign an existing Stripe or PayPal gateway to a store’s checkout. The connector does not return gateway secrets or initiate a checkout payment.

## Money

| Tool | What it returns |
|---|---|
| Balance summary | Your current balance, billing totals grouped by type and status, plus a payout breakdown |
| Search transactions | Sales, commissions, payouts, fees, refunds and topups, including your payout history |
| Get payout | One payout by id |
| Search refunds | Payment-gateway refunds on your orders |
| Search topups | Your topup transactions |

Amounts are in USD, the platform settlement currency. Gateway response traces, payout
signatures and raw topup payloads are removed before a response is returned.

The connector can read balances and payouts. Payout requests, transfers and payment for fulfillment orders are handled outside the connector. Approving an order’s designs can charge extra print costs to your SenPrints balance.


## Blog & SEO

| Tool | What it does |
|---|---|
| Search blog posts | Your storefront posts, by store, keyword, category or published state |
| Get blog post | One post including its full HTML body |
| Search blog categories | Your categories, so a post can be filed correctly |
| **Create or update a blog post** | **Writes, and publishes to your public storefront** |

Without confirmation, **Create or update a blog post** previews whether it would create or
update a post, the resolved URL slug, target store, published state and body size. On update,
it retains the existing slug unless you provide a new one. All HTML is sanitised when saved,
so scripts and event handlers are removed from submitted content.

## Help center

| Tool | What it returns |
|---|---|
| Search SenPrints guides | Help center guides, seller policies and announcements matching your keywords |
| Read a SenPrints guide | One article in full, with its link |

## Account

| Tool | What it returns |
|---|---|
| Who am I | The seller id, email, name, currency and timezone this session is bound to |

Use this tool first if you have more than one SenPrints account.
