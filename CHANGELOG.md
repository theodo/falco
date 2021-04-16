# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.1] — 2021-04-16

- [Bugfix]: Correctly display projects and account menus (@fargito)

## [1.2.0] — 2021-04-16

- [Security] : Bump Python version to 3.8 (@fargito)
- [Security] : Bump Django version to 3.2 (@fargito)
- [Security] : Update all frontend packages (@fargito)
- [Security] : Bump Redis version to 6.2 (@fargito)
- [Bugfix]: add environment to postgresql (@MParvin)

## [1.1.5] — 2020-07-04

- [Accessibility] : improve accessibility
- [Dependencies] : upgrade backend and frontend dependencies
- Fail audits that to do not finish and add command to delete unfinished audits

## [1.1.4] — 2020-03-19

- [Security] Bump Acorn to 5.7.4 && 6.4.1 (#125, #127)
- [i18n] Translate to farsi, fix improper translation (#121, #124) (@MParvin, @fargito)
- Better fixtures for local dev & review apps (#134) (@phacks)
- Display “Go to admin” link in Account panel for admins (#135) (@phacks)

## [1.1.3] — 2019-12-20

- [Security] Bump Django to 3.0.1 (#101) (@phacks)
- Fix `from_date` not working for scripts (#103) (@phacks)
- Activate gzip compression on API calls (#104) (@phacks)

## [1.1.2] — 2019-12-17

- Upgrade backend dependencies (@phacks)
- Remove node_modules from the root of the repository (@toqueteos)

## [1.1.1] — 2019-12-13

- Fix WPT Compare view not working for Private Instances (@phacks)

## [1.1.0] — 2019-12-13

- Add support for WebPageTest Private Instances 🎉 (@phacks)

## [1.0.3] - 2019-12-10

- Upgraded Docusaurus for performance and bugfixes (@phacks)
- Fixed a translation problem for users neither French nor English-speaking (@phacks)

## [1.0.2] - 2019-10-28

### Added

- Pipe application logs to Heroku, for easier debugging (@kraynel)

### Fixed

- Update Dockerfile to run Celery as a dedicated, non-root user (@kraynel)

## [1.0.1] - 2019-10-25

### Fixed

- Fixed a SSL problem in Docker Compose deployment (@kraynel)

### Added

- Improve build time (@kraynel)
- Added this very Changelog (@phacks)
- Added a Contributing guide (@phacks)

## [1.0.0] - 2019-10-24

🎉Initial release! 🎉

[unreleased]: https://github.com/theodo/falco/compare/1.2.1...HEAD
[1.2.1]: https://github.com/theodo/falco/compare/1.2.1...1.2.0
[1.2.0]: https://github.com/theodo/falco/compare/1.2.0...1.1.5
[1.1.5]: https://github.com/theodo/falco/compare/1.1.5...1.1.4
[1.1.4]: https://github.com/theodo/falco/compare/1.1.4...1.1.3
[1.1.3]: https://github.com/theodo/falco/compare/1.1.3...1.1.2
[1.1.2]: https://github.com/theodo/falco/compare/1.1.2...1.1.1
[1.1.1]: https://github.com/theodo/falco/compare/1.1.1...1.1.0
[1.1.0]: https://github.com/theodo/falco/compare/1.0.3...1.1.0
[1.0.3]: https://github.com/theodo/falco/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/theodo/falco/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/theodo/falco/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/theodo/falco/releases/tag/1.0.0
