<p align="center">
  <a href="https://getfal.co">
    <img alt="Falco" src="https://falco-backup-db.s3.eu-west-3.amazonaws.com/logo.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Falco · an Open Source WebPageTest runner
</h1>

<div align="center">
  <a href="https://getfal.co">
    <img alt="Falco screenshot" src="https://falco-backup-db.s3.eu-west-3.amazonaws.com/falco_screenshot.jpg" width="600"/>
  </a>
</div>

<br />

<p align="center">
    Falco helps you <b>monitor, analyze, and optimize</b> your websites.
</p>

[![CircleCI](https://circleci.com/gh/theodo/falco/tree/master.svg?style=svg)](https://circleci.com/gh/theodo/falco/tree/master)
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors)

## Features

- 🔬 Automatically run audits multiple times a day in many conditions
- 📈 See the evolution of key performance metrics to easily spot regressions
- 👥 Invite the whole team so that everyone (devs, ops, product, marketing…) is involved in performance
- 🗺 Audit the performance of individual URLs or entire user journeys ([even on Single Page Apps!](https://css-tricks.com/recipes-for-performance-testing-single-page-applications-in-webpagetest/))
- 📸 Easily access and compare WebPageTest results between audits
- 🙈 Can be used with your own Private Instance of WebPageTest

You can try a demo version by logging in to https://falco.theo.do with the credentials `demo / demodemo`.

## Quick start

You can deploy Falco on Heroku by clicking on the following button:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/theodo/falco/tree/1.1.3)

You will need to provide your credit card details to Heroku, but you will be under the free tier by default. You can find more details on why they are needed and Heroku’s pricing policy [in the docs](https://getfal.co).

After deployment, you can connect to Falco (and the admin interface at `/admin/`) with the credentials `admin` and `admin`: make sure to change your password after connecting!

<details>
<summary>Heroku Teams user? Click here to deploy Falco.</summary>
<br />
Heroku Teams do not allow for free Dynos, thus the above button will not work. Instead, you can click the following, Heroku Teams-specific button that will create “hobby”-sized dynos:
<br />
<br />
<a href="https://heroku.com/deploy?template=https://github.com/theodo/falco/tree/heroku-teams-button"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku" /></a>
</details>

## Docs

Full documentation for Falco lives on the [docs website](https://getfal.co).

## Contributing

Thanks for your interest in contributing! There are many ways to contribute to this project. Get started [here](./CONTRIBUTING.md).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://phacks.dev/"><img src="https://avatars1.githubusercontent.com/u/2587348?v=4" width="100px;" alt=""/><br /><sub><b>Nicolas Goutay</b></sub></a><br /><a href="#design-phacks" title="Design">🎨</a> <a href="https://github.com/theodo/falco/commits?author=phacks" title="Code">💻</a> <a href="#content-phacks" title="Content">🖋</a> <a href="#infra-phacks" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/theodo/falco/commits?author=phacks" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/gllmcornet"><img src="https://avatars3.githubusercontent.com/u/35029311?v=4" width="100px;" alt=""/><br /><sub><b>Guillaume Cornet</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=gllmcornet" title="Code">💻</a> <a href="#infra-gllmcornet" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#design-gllmcornet" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/kraynel"><img src="https://avatars3.githubusercontent.com/u/4620699?v=4" width="100px;" alt=""/><br /><sub><b>Kevin Raynel</b></sub></a><br /><a href="#infra-kraynel" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/CecileSerene"><img src="https://avatars3.githubusercontent.com/u/24312896?v=4" width="100px;" alt=""/><br /><sub><b>Gontier Cécile</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=CecileSerene" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/LouisPinsard"><img src="https://avatars1.githubusercontent.com/u/30240360?v=4" width="100px;" alt=""/><br /><sub><b>Louis Pinsard</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=LouisPinsard" title="Code">💻</a></td>
    <td align="center"><a href="https://www.theodo.fr/"><img src="https://avatars0.githubusercontent.com/u/44815600?v=4" width="100px;" alt=""/><br /><sub><b>Vincent Larrat</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=vlarrat-theodo" title="Code">💻</a> <a href="#security-vlarrat-theodo" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/antkahn"><img src="https://avatars3.githubusercontent.com/u/4716121?v=4" width="100px;" alt=""/><br /><sub><b>antkahn</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=antkahn" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/fargito"><img src="https://avatars3.githubusercontent.com/u/29537204?v=4" width="100px;" alt=""/><br /><sub><b>François Farge</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=fargito" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/EtienneGrall"><img src="https://avatars2.githubusercontent.com/u/44709108?v=4" width="100px;" alt=""/><br /><sub><b>EtienneGrall</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=EtienneGrall" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/alexfauquette"><img src="https://avatars2.githubusercontent.com/u/45398769?v=4" width="100px;" alt=""/><br /><sub><b>Alexandre Fauquette</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=alexfauquette" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/0xflotus"><img src="https://avatars3.githubusercontent.com/u/26602940?v=4" width="100px;" alt=""/><br /><sub><b>0xflotus</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=0xflotus" title="Documentation">📖</a></td>
    <td align="center"><a href="http://codepen.io/donroyco/"><img src="https://avatars2.githubusercontent.com/u/1763537?v=4" width="100px;" alt=""/><br /><sub><b>Roy</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=donroyco" title="Documentation">📖</a></td>
    <td align="center"><a href="http://alberic.trancart.net/"><img src="https://avatars1.githubusercontent.com/u/6317823?v=4" width="100px;" alt=""/><br /><sub><b>Albéric Trancart</b></sub></a><br /><a href="#ideas-AlbericTrancart" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://toqueteos.es"><img src="https://avatars3.githubusercontent.com/u/699969?v=4" width="100px;" alt=""/><br /><sub><b>Carlos Cobo</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=toqueteos" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.andreaswagner.name"><img src="https://avatars1.githubusercontent.com/u/1685114?v=4" width="100px;" alt=""/><br /><sub><b>Andreas Wagner</b></sub></a><br /><a href="https://github.com/theodo/falco/commits?author=whysthatso" title="Documentation">📖</a></td>
    <td align="center"><a href="http://MParvin.net"><img src="https://avatars0.githubusercontent.com/u/7812338?v=4" width="100px;" alt=""/><br /><sub><b>Mohammad Parvin</b></sub></a><br /><a href="#translation-MParvin" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Sponsor

The ongoing development of Falco is proudly sponsored by [Theodo](https://www.theodo.fr/).

<div align="center">
  <a href="https://www.theodo.fr/" />
    <img alt="Theodo logo" src="https://cdn2.hubspot.net/hub/2383597/hubfs/Website/Logos/Logo_Theodo_cropped.svg" width="200"/>
  </a>
</div>

> Our Paris, London & New York teams of full-stack developers and agile experts bring together the tech, the talent and the experience to develop your web, mobile and software applications in record time.
