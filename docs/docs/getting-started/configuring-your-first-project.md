---
id: configuring-your-first-project
title: Configuring your first project
sidebar_label: Configuring your first project
---

## Getting a WebPageTest API Key

As Falco relies on the [WebPageTest REST API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis) to run the audits, it is necessary to create a WebPageTest API Key.

To do so, head to WebPageTest’s [Request API Key page](https://www.webpagetest.org/getkey.php), fill up the (really small) form by entering your email, name, company and website, and click the link on the the confirmation email you should have recieved upon sumbission.

This email contains your WebPageTest API Key that we will use in the next section.

## Import data from WPT

WPT provides numerous options for running your tests (location, bandwidth), so you **must** import this data before setting up your first project. You can do this via the admin interface:
1. Head to `<your Falco instance URL>/admin/django_celery_beat/periodictask/` 
1. Check the `Get all wpt audit configurations: 0 1 * * * (m/h/d/dM/MY) UTC` checkbox
1. Choose the Run the task option from the dropdown list


![Run import task](/docs/static/img/wpt-update.png)


## Creating your first project

To create your first project, head to `<your Falco instance URL>/admin/` and connect to the admin interface. Then click on the `+ Add` button in the `Projects` section, and you should see the following form:

![The form used to create a project](/docs/static/img/create-project.png)

The form fields are as follow:

- `Name`: the name of the project;
- `WPT API Key`: the WebPageTest API key that you created earlier;
- `Pages`: A _page_ is a public (non-authenticated) URL to do a performance audit against. Pages have a name and an associated URL;
- `Scripts`: A _script_ is the code for a WebPageTest script, which can be used to test user journeys, or pages that are behind an authentication, or pages that do not have a proper URL. To know more about WebPageTest scripting, you can read “[Recipes for Performance Testing Single Page Applications in WebPageTest](https://css-tricks.com/recipes-for-performance-testing-single-page-applications-in-webpagetest/)” by [@phacks](https://twitter.com/phacks) (phacks is a maintainer of Falco).
- `Project Audit Parameters`: A _project audit parameter_ is a set of conditions under with the audits will be ran. You can configure the geographic situation, the browser, the device, and the network shape—and give this set of conditions a more concise, memorable name. The available configurations are updated daily from the ones available on the [WebPageTest website](https://webpagetest.org/).

Once you have created your project, you can lanch a manual audit from either:

- The Django Admin interface, under `Projects`
- The Falco interface, with the button `Launch audits manually`
