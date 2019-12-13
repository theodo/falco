---
id: about-wpt-private-instances
title: About WebPageTest Private Instances
sidebar_label: About WebPageTest Private Instances
---

WebPageTest is Open Source, meaning everyone can [access and modify its source code](https://github.com/WPO-Foundation/webpagetest)—meaning that it can be ran on one’s own infrastructure as well. 

Although the public instance, hosted at https://webpagetest.org, is perfectly suitable for most use cases, sometimes it can be useful to host one’s own Private Instance of WebPageTest:

- A Private Instance has no API rate limiting, meaning you can use the API to test more than 200 page views per day (the limit on the public instance);
- WebPageTest audits results started through the API [will only be stored for 30 days](https://www.webpagetest.org/forums/showthread.php?tid=15759&pid=31710#pid31710) on the public instance, whereas you can store them indefinitely on your Private Instance;
- As your organization will likely be the sole user of the Private Instance, queuing times will be greatly reduced;
- A Private Instance can be hosted inside your own VPN, so that it will be able to access websites that are not accessible outside your network;
- It helps alleviate the load on the public instance 🙂

A few points to keep in mind if you’re planning to host your own Private Instance:

- If you’re going to host it on AWS or GCP, it will cost you money. How much money will depend on your usage, as (at least on AWS) the WebPageTest test agents are spawned and killed automatically as you need them;
- Private Instances do not allow testing on mobile devices.

To deploy your own WebPageTest Instance, follow the [documentation](https://github.com/WPO-Foundation/webpagetest-docs/blob/master/user/Private%20Instances/README.md). If you have any trouble, you might want to ask for help on the [WebPageTest Forums](https://www.webpagetest.org/forums/) or on the [WebPerformance Slack community](https://webperformance.herokuapp.com/), in the `#webpagetest-instances` channel.

Once your Private Instance is up and running, you can setup Falco to use it!