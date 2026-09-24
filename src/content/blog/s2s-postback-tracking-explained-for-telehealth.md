---
title: "Server-to-server postback tracking, explained for telehealth offers"
description: "Why browser pixels miss telehealth conversions, what a server-to-server postback does differently, and how to set one up so brands and partners see the same sale."
pubDate: 2026-09-12
cover: postback
quickAnswer: "A server-to-server postback is a conversion signal sent from the brand's server to the tracking platform when an order is charged, carrying the click ID from the original click. It credits sales that happen days later on another device, which browser pixels miss. It is how OnPoint attributes every telehealth conversion."
related: [everflow-tracking-for-telehealth-offers, google-search-affiliates-telehealth-offers]
audience: both
tags: [tracking, postback, Everflow, attribution]
faq:
  - q: "What is a server-to-server postback?"
    a: "A conversion signal sent directly from the brand's server to the tracking platform when a sale happens, instead of relying on a pixel in the patient's browser. It carries a click ID so the sale can be tied back to the exact partner, ad, and channel."
  - q: "Why do browser pixels miss telehealth conversions?"
    a: "Telehealth funnels are long. A patient can start on a phone in an in-app browser, finish intake later on a laptop, and get charged after a provider reviews the case. Pixels lose the thread at every one of those steps. A server postback fires when the charge happens, wherever the patient is."
  - q: "What is a click ID and why does it matter?"
    a: "A unique ID created when someone clicks a tracking link. It is passed into the funnel and stored with the order. When the sale fires, the postback sends that ID back so the platform can attribute the sale to the right partner and ad. Without it, the sale is real but nobody knows who sent it."
---

If a brand and a partner disagree about how many sales happened, the problem is almost always tracking, and the fix is almost always a server-to-server postback. Here is what that is, why it matters more in telehealth than in most categories, and how to set it up properly.

## The problem with pixels in telehealth

A pixel is a small piece of code in the patient's browser that fires when they reach a certain page. It works fine for a simple checkout. Telehealth funnels are not simple.

A typical GLP-1 patient journey looks like this:

1. Sees an ad on a phone and taps through in an in-app browser.
2. Starts a medical intake quiz.
3. Leaves, comes back two days later on a laptop from an email reminder.
4. Finishes intake and enters payment.
5. Is charged only after a licensed provider reviews the case, sometimes hours later.

A browser pixel loses the thread at step 3, and again at step 5, because the charge does not happen in a browser at all. The sale is real. The pixel never sees it.

## What a server-to-server postback does

Instead of trusting the browser, the brand's own server tells the tracking platform when the sale happens. The flow:

1. Partner sends a patient through a tracking link. The platform creates a unique **click ID**.
2. The click ID is passed into the brand's funnel and stored with the patient's record.
3. When the order is actually charged, the brand's server sends a request to the tracking platform: "click ID such-and-such just converted, order value X."
4. The platform matches the click ID to the original click and credits the right partner, ad, and channel.

No browser involved at the moment of truth. It fires when the money moves, on whatever device, however many days later.

## Why this matters for both sides

**For brands:** you pay partners on real charged orders, not on "reached the thank-you page." Refunds and cancellations can be sent as reversal postbacks, so the ledger stays accurate.

**For partners:** you get credited for sales that happen two days later on a different device. That is often 20 to 40 percent of telehealth conversions. Without a postback, that revenue is invisible and you are underpaid.

**For both:** one event, one source of truth. When both sides look at the same postback log, the "your numbers do not match mine" conversation ends.

## The setup checklist

- **Pass the click ID all the way through.** From the tracking link, into the landing page, through the quiz, into the order record. If any page drops it, attribution dies there.
- **Fire on the charge, not the form.** The postback should trigger on the actual payment event. Firing on "intake complete" pays for patients who never got approved.
- **Send reversals.** Refund, chargeback, and cancel events should go back to the platform so partners are not paid on sales that unwound.
- **Test before launch.** Fire a test click and a test conversion. Confirm the partner sees it in their dashboard with sub IDs intact. Do this every time the funnel changes.
- **Keep the browser pixel as backup.** It helps ad platforms optimize, and it catches problems if the postback ever breaks. Just do not pay on it.

## The tools

Most health networks, including OnPoint, run this through Everflow for partner tracking and payouts, with Google Tag Manager handling browser events for ad platform optimization. Everflow generates the click ID and receives the postback. Google Tag Manager manages the pixels. The brand's checkout or telehealth platform sends the server event.

If your current network cannot show you a postback log with click IDs, order values, and reversal events, you do not have tracking. You have a dashboard.
