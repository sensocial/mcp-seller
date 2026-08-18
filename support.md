# Support

## Common problems

**"It says I have no orders, but I do."**
You may be connected as a team member rather than the account owner. The connector links the
account you use to sign in, not an account to which you have been granted access. Ask *"which
account am I connected to?"* If it identifies your account rather than the store you manage,
the account owner must connect their account.

**"The numbers don't match my dashboard."**
Check the reporting period and store. Specify the period, for example "1–31 October" rather
than "last month", and name the store if you have more than one. The connector uses your
account timezone.

**"It won't connect."**
See [If it does not connect](connect.md#if-it-does-not-connect).

**"Too many requests."**
You have exceeded the limit of 60 requests per minute for one account. Wait one minute before
continuing. If it occurs during normal use, contact support because the client may be repeating
requests.

**"My token stopped working."**
Manual tokens last 90 days. Generate a new one at **Settings → MCP**. Note that issuing a
sixth token automatically revokes the oldest.

**"It changed something I didn't approve."**
Both write tools return a preview by default and apply only when confirmation is set. They are
marked `destructiveHint`, so a compliant client prompts before applying a change. The server
does not require a human second round trip: if your AI client approves tool calls
automatically, it can submit confirmation on the first call without prompting you. Disable
automatic approval for this connector if you want the client to show each proposed write. If
automatic approval is disabled and an unexpected change still occurs, revoke the connection
at **Settings → MCP** and contact support with the approximate time.

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

**Never send an access token** in a ticket, email or screenshot. If you believe a token has
been exposed, revoke it at **Settings → MCP** before contacting support.

---

## Reference

- Server URL: `https://api.senprints.com/mcp/seller`
- Seller-center variant: `https://api.senprints.com/mcp/seller-custom`
- Transport: streamable HTTP
- Auth: OAuth 2.1, PKCE S256, dynamic client registration
- 28 tools — 26 read, 2 write
