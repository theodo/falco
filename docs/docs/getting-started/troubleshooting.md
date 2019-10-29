---
id: troubleshooting
title: Troubleshooting failed audits
sidebar_label: Troubleshooting failed audits
---

If one of your audits failed, you should see an error message in the Projects page:

![Error message indicating that the last audit failed](/img/error-message.png)

## Getting more information on failed audits

To troubleshoot failed audits, you can follow these instructions:

1. Login to the admin interface;
2. Click on `Audits`;
3. Select one of the audits that failed (if all audits failed, the most recent should do);
4. Scrolling down all the way to the bottom, you should see the `WPT Results User URL field` (see screenshot below);
5. Copy and paste that link in a new browser tab, this will hopefully display either the results (if the WPT audit went OK but there was a problem in Falco’s parsing of results) or a WPT error page with a little bit more details on the problem.

![WPT results user URL field in Admin](/img/wpt-results-user-url.png)

## Common causes of failed audits

- Your API key can be incorrect: check that you copy-pasted it correctly, including the `A.` prefix;
- You may have exceeded the daily allowed page loads, as explained the WebPageTest email you receive when requesting an API key:
    > “The API key is limited to 200 page loads per day.  Each run, first or repeat view counts as a page load (10 runs, first and repeat view would be 20 page loads). If you need to do more testing than that allows then you should consider running a private instance: https://sites.google.com/a/webpagetest.org/docs/private-instances”