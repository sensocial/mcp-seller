# Connect in 3 steps

You can connect through SenPrints sign-in or with a manually generated access token. Use the
sign-in method when your AI client supports it.

---

## Method 1 — Sign in with SenPrints (recommended)

Your AI client opens SenPrints for sign-in and connection approval. The client then stores and
refreshes its token. You do not need to copy credentials, and you can revoke the connection
from your seller dashboard.

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

The client registers automatically. You do not need to create a client ID or client secret.

> **If your dashboard is on the seller-center domain**, use
> `https://api.senprints.com/mcp/seller-custom` instead. It provides the same connector and
> tools but directs you to the corresponding login page. If you are unsure, try the first URL.
> If it directs you to a domain where you do not have an account, use the other URL.

### 2. Approve the connection

The client opens a SenPrints login page. Sign in and approve the consent screen. The screen
identifies the account being connected; check it if you have more than one account.

### 3. Ask something

First ask **"which SenPrints account am I connected to?"** The assistant returns the account
name and email. Confirm that they match the account you intended to connect.

---

## Method 2 — Access token

Use a manual access token only when your client does not support the sign-in flow.

1. Open **Settings → MCP** in your seller dashboard.
2. Click **Generate token**. Copy it — it is shown once and never again.
3. Paste it into your client as a bearer token for `https://api.senprints.com/mcp/seller`.

Notes on tokens:

- A token is valid for **90 days**. Generate a new token after it expires.
- You can hold **5 tokens at a time**. Generating a sixth automatically revokes the oldest, so
  a device you no longer use cannot retain a working token indefinitely.
- Revoke any token at any time from the same screen. Revoking takes effect immediately.
- Treat a token as a password. Anyone holding it can read your account. Do not paste it into a
  shared document, a screenshot, or a support ticket.

---

## Disconnecting

For either method, **Settings → MCP** in your dashboard lists every active connection and
token. Revoke an entry there to remove its access immediately. You do not need to change your
SenPrints password.

---

## If it does not connect

| What you see | What it usually means |
|---|---|
| Login page loads, approval fails | You are signed into a different SenPrints account in that browser. Sign out and retry. |
| Connects, but the assistant says it cannot see anything | You are a **team member** on someone else's account. See below. |
| "Too many requests" | You have gone over the per-minute limit. Wait a minute and continue. |
| Token rejected immediately | The token expired (90 days) or was revoked. Generate a new one. |

**Team members:** the connector links the account you use to sign in, not an account to which
you have been granted team access. If you manage another seller's store as a team member, the
connector shows your own account, which is usually empty. The account owner must connect their
account.
