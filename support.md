---
title: Support
nav_order: 7
---

# Support

## Common problems

**"It says I have no orders, but I do."**
You are probably connected as a team member rather than as the account owner. The connector
links the account *you* log in as, not one you have been granted access to. Ask *"which
account am I connected to?"* — if it names your own account rather than the store you manage,
that is the cause. The owner needs to connect their own account.

**"The numbers don't match my dashboard."**
Almost always a different window or a different store. Say the period explicitly ("1–31
October", not "last month") and name the store if you have more than one. The connector uses
your account timezone.

**"It won't connect."**
See [If it does not connect](connect.md#if-it-does-not-connect).

**"Too many requests."**
You hit the 60-per-minute account limit. Wait a minute. If it happens without you doing
anything unusual, tell us — a client may be looping.

**"My token stopped working."**
Manual tokens last 90 days. Generate a new one at **Settings → MCP**. Note that issuing a
sixth token automatically revokes the oldest.

**"It changed something I didn't approve."**
It should not be able to. Both write tools preview first and wait for a yes. If you believe
something changed without confirmation, revoke the connection at **Settings → MCP** and email
us with the approximate time.

---

## Getting help

| For | Contact |
|---|---|
| Connector not working, wrong results, general questions | Your usual SenPrints seller support channel |
| Privacy, deletion requests, data questions | **privacy@senprints.com** |
| Suspected data exposure — data that is not yours | **privacy@senprints.com**, immediately |

### What to include

- The account email.
- The question you asked, word for word.
- Roughly when, and your timezone.
- Which AI client you use.

**Never send an access token**, in a ticket, an email or a screenshot. If you think a token
has been exposed, revoke it at **Settings → MCP** first, then tell us.

---

## Reference

- Server URL: `https://api.senprints.com/mcp/seller`
- Seller-center variant: `https://api.senprints.com/mcp/seller-custom`
- Transport: streamable HTTP
- Auth: OAuth 2.1, PKCE S256, dynamic client registration
- 28 tools — 26 read, 2 write
