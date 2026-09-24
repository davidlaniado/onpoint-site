---
title: "Everflow Tracking and S2S Postbacks for Telehealth Offers"
h1: "Tracking that both sides <span class='text-teal-ink'>can trust.</span>"
description: "How OnPoint sets up Everflow tracking, click IDs, and server-to-server postbacks for telehealth offers so brands and partners see the same conversions."
quickAnswer: "OnPoint runs partner tracking on Everflow. Every partner click gets a click ID that is passed into the brand's funnel and stored with the order. When the order is charged, the brand's system sends a server-to-server postback to Everflow, which credits the partner, ad, and channel. Refunds and chargebacks are sent as reversals. Brands and partners see the same events."
audience: both
group: brand
cover: postback
order: 22
updated: 2026-09-23
related: [telehealth-affiliate-network-for-brands, google-search-affiliates-telehealth-offers, compliant-traffic-for-telehealth-brands]
faq:
  - q: "Why server-to-server instead of a pixel?"
    a: "Telehealth funnels are long and cross devices, and the charge often happens after provider review, outside any browser. A server postback fires when the money moves, wherever the patient is. Pixels miss a large share of those conversions."
  - q: "What does the brand need to build?"
    a: "Pass the click ID from the landing page through intake into the order record, and send one HTTP request to the postback URL when the order is charged, plus reversal requests on refund or chargeback. Most telehealth platforms can do this natively or with a small change."
  - q: "Can partners see funnel events, not just sales?"
    a: "Yes. Quiz start and checkout events are reported alongside sales so partners can optimize before sale data arrives."
  - q: "How are reversals handled?"
    a: "Refunds, chargebacks, duplicates, and fraud are sent as reversal events with a reason, so the partner sees why a conversion was removed."
  - q: "Do you also use Google Tag Manager?"
    a: "Yes, for browser-side events used by ad platforms for optimization. Payouts are never based on browser events."
---

## The setup, end to end

1. **Tracking link.** Each partner and campaign gets a unique Everflow link. Clicking it creates a click ID.
2. **Click ID into the funnel.** The landing page captures the click ID and carries it through the intake into the order record.
3. **Postback on the charge.** When the patient's order is charged, the brand's system sends a server-to-server request to Everflow with the click ID and order value.
4. **Attribution.** Everflow matches the click ID to the partner, ad, and channel and credits the conversion.
5. **Reversals.** Refunds, chargebacks, duplicates, and fraud are sent as reversal events with a reason.
6. **Reporting.** Brand and partner see the same conversion log.

## What we test before launch

A real click and a real test conversion, checked in both the brand's system and the partner's Everflow report, with sub IDs intact. We repeat this any time the funnel changes.

## Why this ends the "our numbers do not match" conversation

Because there is one event, recorded once, on the charge, visible to both sides. Not a pixel that fired on a thank-you page, not a screenshot of a dashboard.

## What brands should also keep

A browser pixel through Google Tag Manager for ad platform optimization. It helps Meta and Google learn. It is never the basis for a payout.

## How to start

Brands: apply and we will send the postback spec. Partners: apply and you will get tracking links once verified.
