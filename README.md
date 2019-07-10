# pghnaz.org

This is the sourcecode repository for the official site of the Pittsburgh District Church of the Nazarene.

View the site at https://pghnaz.org/.

## Overview

The site is built with the static site generator [Eleventy](https://11ty.io/) on [Node.js][nodejs].

The theme files are in [`src/includes/`](https://github.com/pghnaz/pghnaz.org/tree/master/src) are stored in a submodule at https://github.com/pghnaz/caimhoff.

## Contributing

Before submitting an issue or pull request, please read our [code of conduct](https://github.com/pghnaz/pghnaz.org/blob/master/CODE_OF_CONDUCT.md).

Also, check out our [wiki](https://github.com/pghnaz/pghnaz.org/wiki) for style guides and coding standards.

### Local Development

Follow these steps to run a copy of this site on your personal comupter or other local development environment.

1. Install [Node.js][nodejs]
2. Clone or download this repository, including its submodules.
```cli
~$ git clone --recursive https://github.com/pghnaz/pghnaz.org.git
```
3. Install dependencies
```cli
$ npm install
```
4. Start the local server
```cli
~$ npx eleventy --serve
```

**NB, if you already have a local copy, then you need to manually update the submodules when you pull other updates from the GitHub.**

```cli
$ git submodule update --remote --merge
```

### Contributors

Thanks for helping make this site possible.

* [Reuben L. Lillie](https://github.com/reubenlillie/)
* [Justin Czech](https://github.com/czechju/)

&copy; 2019 by Pittsburgh District Church of the Nazarene

[nodejs]: https://nodejs.org/
