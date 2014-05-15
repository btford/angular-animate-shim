# angular-animate-shim

Adds a `$animate` service for versions of Angular `1.1.x` and below.

This lets you use 3rd party components that depend on `$animate` (like
[`angular-modal`](https://github.com/btford/angular-modal)) with older versions
of Angular.

This does not allow versions of Angular `1.1.x` and below to perform animations.


## Install

via npm:

```shell
npm install angular-animate-shim
```

or via `bower`:

```shell
bower install angular-animate-shim
```


## Usage

1. Include the `animate.js` script provided by this component into your app.
2. Add `btford.animate-shim` as a module dependency to your app.


## License
MIT
