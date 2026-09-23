---
title: "Reading a telehealth funnel: the five numbers that actually matter"
description: "Cost per click is noise. Here are the five metrics we watch daily on GLP-1, ED, and TRT funnels, the rough ranges we expect, and what each one tells you to fix."
pubDate: 2026-09-03
cover: blog-funnel
quickAnswer: "The five numbers that matter in a telehealth funnel are quiz start rate, cost per quiz start, checkout rate, cost per approved sale, and checkout-to-sale rate. Cost per approved sale tracked server-side is the one that decides whether a campaign works; the rest tell you where it is leaking."
related: [meta-media-buyers-telehealth-offers, everflow-tracking-for-telehealth-offers]
audience: both
tags: [media buying, funnel, metrics, optimization]
faq:
  - q: "What is a good quiz start rate for a telehealth funnel?"
    a: "It varies by offer and traffic source, but on cold paid social a landing page that turns roughly a third of visitors into quiz starts is doing its job. Well under that usually means the ad and the page do not match."
  - q: "What is the most important metric in telehealth media buying?"
    a: "Cost per approved sale, tracked server-side. Everything above it in the funnel is a diagnostic. Everything below it (retention, refunds) decides whether the sale was worth having."
  - q: "How quickly should you kill a losing telehealth ad?"
    a: "Set a spend threshold tied to the payout before launch. A common rule is to pause any ad that has spent roughly one payout with zero sales and no strong leading indicators like cheap checkouts. Decide the rule before you launch, not while you are emotional about the ad."
---

Most telehealth dashboards show fifty numbers. Five of them matter. Here is how we read a funnel every morning, top to bottom, and what each number tells you to do.

## 1. Quiz start rate

**What it is:** visitors who click into the medical intake, divided by visitors who landed.

**Why it matters:** it is the cleanest test of whether the ad and the landing page agree. If the ad promised one thing and the page opens with another, people leave before the quiz.

**What to do when it is low:** fix the page, not the ad. Match the first headline to the ad's hook. Move the quiz button above the fold on mobile. Remove anything that makes the visitor read before they can act.

## 2. Cost per quiz start

**What it is:** ad spend divided by quiz starts.

**Why it matters:** it is the earliest cost signal you get, hours before a sale. If cost per quiz start doubles, cost per sale is about to double too.

**What to do when it is high:** the problem is upstream. Either the click is expensive (creative fatigue, wrong audience) or the landing page is leaking (see number 1). Look at both.

## 3. Checkout rate

**What it is:** people who reach the payment step, divided by quiz starts.

**Why it matters:** this is the intake itself. Long quizzes, confusing medical questions, and surprise pricing all show up here.

**What to do when it is low:** walk the quiz on your own phone. Count the screens. Find the one where people leave (most tracking platforms will show you). Usually it is the screen that mentions price for the first time, or the screen that asks for something scary.

## 4. Cost per approved sale

**What it is:** spend divided by charged, provider-approved orders, tracked through a server postback.

**Why it matters:** this is the number. Everything above it is a diagnostic. If cost per sale is under the payout (for partners) or under the allowable acquisition cost (for brands), the campaign is working, whatever the other numbers say.

**What to do when it is high:** work backwards through 1 through 3 to find the leak. If all three look normal and sales are still expensive, the problem is between checkout and approval: card declines, provider rejections, or patients dropping before the charge.

## 5. Checkout to sale

**What it is:** approved sales divided by checkouts.

**Why it matters:** it catches problems nobody else is watching. A sudden drop here with stable numbers above it means something broke at payment or approval, not in the ads.

**What to do when it drops:** check the payment processor, the provider queue, and the postback. This is usually a technical problem, not a marketing one.

## The kill rule

Decide before launch how much an ad can spend with zero sales before it is paused. A common starting point is roughly one payout. Then add exceptions for strong leading indicators: an ad with zero sales but very cheap checkouts is probably about to convert, so give it more room. An ad with expensive quiz starts and no checkouts at half the threshold is not going to recover.

Write the rule down. Apply it every morning. The ads you are emotionally attached to are the ones that cost the most.

## Reading it as a brand vs as a partner

**Partners** watch 2 and 4 hardest, because those decide profit today.

**Brands** watch 1, 3, and 5 hardest, because those are the funnel they control, and a leak there costs every partner at once.

Both sides should be looking at the same postback data. If the partner's number 4 and the brand's number 4 disagree, that is a tracking problem to fix before anything else.
