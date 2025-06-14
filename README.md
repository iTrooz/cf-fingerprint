# cf-fingerprint

CurseForge fingerprinting algorithm implementation in JavaScript

Based on [curseforge-fingerprint](https://github.com/meza/curseforge-fingerprint/blob/main/src/addon/fingerprint.cpp) in C++

## Install

Add [cf_fingerprint.js](https://github.com/arschedev/cf-fingerprint/blob/main/cf_fingerprint.js) to your project

You can also run `npm install https://github.com/arschedev/cf-fingerprint` to install the package in your project.

You can then use it from both browsers and Node.js environments.

## Usage

### Browser

```js
function readAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (event) => {
            resolve(event.target.result)
        }

        reader.onerror = (error) => {
            reject(error)
        }

        reader.readAsArrayBuffer(file)
    })
}

const buffer = new Uint8Array(await readAsArrayBuffer(file))
const fingerprint = cf_fingerprint(buffer)
```

### Node.js
```js
import fs from "node:fs"
import { cf_fingerprint } from "cf-fingerprint"

const file = fs.readFileSync(filename)
const fingerprint = cf_fingerprint(file)
```

---

> Made for the [Transmoder](https://transmoder.org/) project
