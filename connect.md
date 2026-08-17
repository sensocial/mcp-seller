---
title: Connect in 3 steps
nav_order: 2
---

# Connect in 3 steps

Two ways to connect. Almost everyone should use the first one.

---

## Method 1 — Sign in with SenPrints (recommended)

Your AI client sends you to SenPrints to log in, you approve the connection once, and the
client holds a token it refreshes by itself. Nothing to copy, nothing to paste, and you can
revoke it later from your dashboard.

### 1. Add the server in your AI client

Use this URL:

```
https://api.senprints.com/mcp/seller
```

Where to put it:

| Client | Where |
|---|---|
| Claude | Settings → Connectors → Add custom connector |
| ChatGPT | Settings → Connectors → Add |
| Cursor | Settings → MCP → Add new MCP server |

Your client registers itself automatically — there is no client id or client secret for you
to create.

> **If your dashboard is on the seller-center domain**, use
> `https://api.senprints.com/mcp/seller-custom` instead. Same connector and same tools; it
> only sends you to the matching login page. If you are unsure, use the first URL — you will
> know immediately, because the wrong one asks you to log in somewhere you do not have an
> account.

### 2. Approve the connection

The client opens a SenPrints login page. Sign in as you normally would, then approve the
consent screen. It names the account being connected — check that it is the right one if you
have more than one.

### 3. Ask something

Try **"which SenPrints account am I connected to?"** first. The assistant will name the
account and email. If it names the account you expect, you are done.

---

## Method 2 — Access token

Use this only if your client cannot do the sign-in flow above.

1. Open **Settings → MCP** in your seller dashboard.
2. Click **Generate token**. Copy it — it is shown once and never again.
3. Paste it into your client as a bearer token for `https://api.senprints.com/mcp/seller`.

Notes on tokens:

- A token is valid for **90 days**, then stops working and you generate a new one.
- You can hold **5 tokens at a time**. Generating a sixth automatically revokes the oldest, so
  a laptop you no longer use cannot keep a working token indefinitely.
- Revoke any token at any time from the same screen. Revoking takes effect immediately.
- A token is a password. Anyone holding it can read your account. Do not paste it into a
  shared document, a screenshot, or a support ticket.

---

## Disconnecting

Both methods are revoked the same way: **Settings → MCP** in your dashboard lists every live
connection and token. Revoke it there and the assistant loses access at once — you do not need
to change your SenPrints password.

---

## If it does not connect

| What you see | What it usually means |
|---|---|
| Login page loads, approval fails | You are signed into a different SenPrints account in that browser. Sign out and retry. |
| Connects, but the assistant says it cannot see anything | You are a **team member** on someone else's account. See below. |
| "Too many requests" | You have gone over the per-minute limit. Wait a minute and continue. |
| Token rejected immediately | The token expired (90 days) or was revoked. Generate a new one. |

**Team members:** the connector links the account you personally log in as, not an account you
have been granted access to. If you manage someone else's store as a team member, your
connector shows your own account — which is usually empty. The account owner needs to connect
their own.
