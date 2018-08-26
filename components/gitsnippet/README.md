# GitSnippet

Render snippets of code intelligently from git repos

## Installation

```shell
yarn add gitsnippet
```

### Usage

`GitSnippet` accepts a [git
revision](https://git-scm.com/docs/gitrevisions) as a string pointing
to the appropriate file at the desired revision. You can also choose
to highlight or hide ranges of code.

```mdx
import GitSnippet from 'gitsnippet';

# My Awesome Documentation

Here's what our README says about foos:

<GitSnippet
  revision={"master:./README"}
  highlightRange={"5-6, 14-17"}
  hidelineRange={"1-3"}
/>
```
