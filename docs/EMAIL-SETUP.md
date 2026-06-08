# Email Setup — Receiving Quote & Order Requests

The site already sends every **Custom Quote**, **Order Request**, and **Contact**
submission to your inbox — it just needs one API key to actually deliver mail.
Leads go to **texasbulkbags@gmail.com**.

Until the key is set, submissions are NOT lost: they're written to the Vercel
function logs (Project → Logs), and the form still confirms success to the user.

## Fastest path (free, no domain needed) — ~5 minutes

This uses [Resend](https://resend.com). With Resend's built-in test sender you
can receive mail at the **exact email you sign up with**, so sign up with
`texasbulkbags@gmail.com`.

1. **Create the account** at https://resend.com using **texasbulkbags@gmail.com**
   and verify it (click the link Resend emails you).
2. **Create an API key:** Resend dashboard → **API Keys** → **Create API Key**
   (Permission: "Sending access"). Copy the key (starts with `re_…`).
3. **Add it to Vercel:** Project `texas-bulk-bags` → **Settings** →
   **Environment Variables** → add:
   - Name: `RESEND_API_KEY`  Value: the `re_…` key  → all environments → Save.
   - (Optional) `LEAD_INBOX` = `texasbulkbags@gmail.com` (already the default).
4. **Redeploy** so the new variable takes effect: Deployments → latest → **Redeploy**
   (or push any commit to `main`).
5. **Test:** submit the Custom Quote form on the live site. The email should
   arrive at texasbulkbags@gmail.com within a minute (check Spam the first time).

That's it. The lead email includes all form fields, and **Reply** goes straight
to the customer (their email is set as reply-to).

## Upgrading later: send from your own domain

The test sender (`onboarding@resend.dev`) can only deliver to your own Resend
account address. To send/receive freely (and look professional), verify your
domain:

1. Resend → **Domains** → add `texasbulkbags.com`, add the shown DNS records.
2. Once verified, set the Vercel env var `EMAIL_FROM` to something like
   `Texas Bulk Bags <quotes@texasbulkbags.com>`.
3. This also unlocks sending an **auto-acknowledgement** email to the customer.

## What sends email

| Form | Route | Subject |
| --- | --- | --- |
| Custom Quote (`/custom-quote`) | `POST /api/quote` | New quote request — {name} |
| Order Request (`/quote-list`) | `POST /api/order` | New order request {ref} — {name} |
| Contact (`/contact`) | `POST /api/quote` | New contact request — {name} |

All include the submitted fields and set the customer's email as **reply-to**.
Spam is filtered with a honeypot field on every form.
