---
id: setting-up-falco-for-private-instances
title: Setting up Falco for Private Instances
sidebar_label: Setting up Falco for Private Instances
---

Falco can be configure to use your Private Instance of WebPageTest to run audits, instead of the public one. This can be set up on a Project basis, so that some of your projects can use your Private Instance and other can use the public one—you can even use several Private Instances should you need to.

To configure a Private Instance on a project, [make sure you are a Project Admin](/docs/getting-started/managing-users), and click on the “Manage project settings” link in the left-hand menu on that Project’s page.

There, you should be able to enter your Private Instance URL (without the trailing slash) and the associated API Key that you declared during the Private Instance setup. If you get an error at that point, please make sure that:

- The URL is correct;
- The API of the instance is correctly working (you can try to head to `<your-private-instance-url>/getLocations.php/getLocations.php?f=html`).

In case you still encounter a problem, please [open an issue](https://github.com/theodo/falco/issues/new?template=bug.md) on the Falco repository!

If everything went OK, you should see a green confirmation message. You can now head to the “Project environments” setting page and pick the environments you want to run the audits in. 

Falco will now run your audits against your Private instance 🎉