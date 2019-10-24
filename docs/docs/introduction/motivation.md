---
id: motivation
title: Motivation
sidebar_label: Motivation
---

Web Performance has become an important responsibility for Web developers. Indeed, there are many impacts of poor performance:

- Your users are less engaged and are less likely to buy/use your product ([source](https://wpostats.com/));
- It can impact negatively the perception of your brand ([source](https://blog.radware.com/applicationdelivery/applicationaccelerationoptimization/2013/12/mobile-web-stress-the-impact-of-network-speed-on-emotional-engagement-and-brand-perception-report/))
- It can, and does, lead to exclusion of some users ([source](https://timkadlec.com/remembers/2019-01-09-the-ethics-of-performance/))
- It leads to users buying new devices more often, causing an economical distress and environmental hazard ([source](https://timkadlec.com/remembers/2019-01-09-the-ethics-of-performance/))

At Theodo, we mainly use [WebPageTest](https://www.webpagetest.org/) to conduct performance audits of our websites. While the tool is great, it became cumbersome to manually trigger tests as frequently as we wanted to, in addition to maintaining an external archive of all our past audits.

We built Falco to help us (and maybe you!) benefit from running regular and exhaustive WebPageTest audits, automatically.

We have been using Falco internally on dozens of different websites, which helped us tackle many performance problems that we wouldn’t have seen otherwise.

We hope it will help you as well!