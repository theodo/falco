---
id: swagger-ui 
title: Using Swagger UI
sidebar_label: Using Swagger UI
---

If you want to try out API calls directly in the Swagger UI documentation, you need a Falco API Key:

1. Access your own Falco instance and log in with a valid user account;
2. Open your browser’s Dev Tools console (usually <kbd>F12</kbd>), and head to the `Network` tab
3. Filter network activity by the `XHR` type
4. Click on any XHR call in the resulting list
5. Scroll down to `Request Headers`, and copy the content of the `Authorization` header (starting from, and including `Bearer`): this is the API Key;
6. Back on the Swagger UI, click on `Authorize` at the top of the page, and paste the api key key in the resulting modal;
7. You’re all set! Click `Try it out!` on any API call to try it out. Beware though that some API calls are restricted to either Super Administrators or Project Administrators (see the “[Managing users](/docs/getting-started/managing-users) section for more details).