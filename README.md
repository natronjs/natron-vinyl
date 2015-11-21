# [![Natron][natron-img]][natron-url]

[natron-img]: http://static.natronjs.com/img/natronjs.svg
[natron-url]: http://natronjs.com/

**Natron Vinyl Utilities**

[![Version][npm-img]][npm-url]
[![Downloads][dlm-img]][npm-url]
[![Readme][readme-img]][readme-url]

[![Gitter Chat][gitter-img]][gitter-url]

[npm-img]: https://img.shields.io/npm/v/natron-vinyl.svg
[npm-url]: https://npmjs.org/package/natron-vinyl
[dlm-img]: https://img.shields.io/npm/dm/natron-vinyl.svg
[readme-img]: https://img.shields.io/badge/read-me-orange.svg
[readme-url]: https://natron.readme.io/docs/module-natron-vinyl

[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/natronjs/natron

This module is part of [Natron][natron-url].

## Documentation

See the [documentation for natron-vinyl][readme-url].

## Usage

```js
import {src, dest, transformer} from "natron-vinyl";

let FileLogger = transformer((file) => {
  console.log(file.path);
  return file;
});

function copy() {
  return (src("src/**/*.js")
    .pipe(new FileLogger())
    .pipe(dest("dist"))
  );
}
```
