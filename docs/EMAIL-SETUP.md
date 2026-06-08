# Email Setup — Receiving Quote & Order Requests

The site already sends every **Custom Quote**, **Order Request**, and **Contact**
submission to your inbox — it just needs one API key to actually deliver mail.
Leads go to **texasbulkbags@gmail.com**.

Until a provider is set, submissions are NOT lost: they're written to the Vercel
function logs (Project → Logs), and the form still confirms success to the user.

You can use **either** Namecheap (Option A) **or** Resend (Option B). If both are
configured, SMTP/Namecheap wins.

---

## Option A — Namecheap Private Email (SMTP)

Use this if you have (or buy) **Namecheap Private Email** — a mailbox like
`info@texasbulkbags.com`. (A plain domain registration does NOT include email;
Private Email is a low-cost add-on in your Namecheap account.)

1. **Get a mailbox:** Namecheap dashboard → **Private Email** → create/confirm a
   mailbox, e.g. `info@texasbulkbags.com`, and note its password. Make sure the
   required MX/SPF/DKIM records are applied (Namecheap adds these automatically
   when the domain and email are both at Namecheap).
2. **Add these Environment Variables in Vercel** (Project `texas-bulk-bags` →
   Settings → Environment Variables), for all environments:
   - `SMTP_HOST` = `mail.privateemail.com`
   - `SMTP_PORT` = `465`
   - `SMTP_USER` = `info@texasbulkbags.com`  (your full mailbox address)
   - `SMTP_PASS` = the mailbox password
   - `EMAIL_FROM` = `Texas Bulk Bags <info@texasbulkbags.com>`
   - `LEAD_INBOX` = `texasbulkbags@gmail.com` (or `info@texasbulkbags.com` to keep
     it all on Namecheap)
3. **Redeploy** (Deployments → latest → Redeploy, or push to `main`).
4. **Test:** submit the Custom Quote form on the live site — the email arrives at
   `LEAD_INBOX` within a minute. **Reply** goes to the customer.

> Notes: SMTP `From` must equal `SMTP_USER` (the authenticated mailbox) — that's
> why `EMAIL_FROM` uses the same address. Namecheap also supports port `587`
> (STARTTLS); if you use it, set `SMTP_PORT=587`.

---

## Option B — Resend (free, no domain needed) — ~5 minutes

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
