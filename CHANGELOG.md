# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

## [Unreleased]

### Added

- Enable MDX Rendering from GraphQL queries

### Changed

- Split mdx-deck support into gatsby-plugin-mdx-deck

## [0.0.7] - 2018-08-05

### Added

- Allow a single defaultLayout in `defaultLayouts` plugin options @avigoldman
- Enable experimental MDXProvider support @christopherbiscardi

### Changed

- [Breaking] change the `wordCount` GraphQL field to `wordCounts` to
  support having `gatsby-transformer-remark` installed at the same
  time.

## [0.0.6] - 2018-07-31

### Added

- Enable the use of source-specific default layouts @avigoldman

### Changed

- Import `@babel/core` instead of `babel-core` @ryaninvents
- Enhance MDXProvider usage documentation @macklinu

## [0.0.5] - 2018-07-28

### Added

- include @mdx-js/tag as a peerdep

## [0.0.4] - 2018-07-27

### Added

- New graphql fields (excerpt, timeToRead, wordCount) @avigoldman
- Enable GraphQL querying of arbitrary serializable exports @avigoldman
- Custom remark plugins example @christopherbiscardi
- Page query in mdx files example @christopherbiscardi

### Changed

- Support mdx@0.15.0-1 @christopherbiscardi
- Fix bug that was preventing custom remark plugins in createPages @christopherbiscardi
- docs updates @christopherbiscardi @avigoldman @kruton

[unreleased]: https://github.com/christopherbiscardi/gatsby-mdx/compare/0.0.6...HEAD
[0.0.7]: https://github.com/christopherbiscardi/gatsby-mdx/compare/0.0.6...0.0.7
[0.0.6]: https://github.com/christopherbiscardi/gatsby-mdx/compare/0.0.5...0.0.6
[0.0.5]: https://github.com/christopherbiscardi/gatsby-mdx/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/christopherbiscardi/gatsby-mdx/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/christopherbiscardi/gatsby-mdx/compare/0.0.2...0.0.3
[0.0.2]: https://github.com/christopherbiscardi/gatsby-mdx/compare/0.0.1...0.0.2
