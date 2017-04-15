"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function eq(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    let c = 0;
    for (let i = 0; i < a.length; i++) {
        // tslint:disable-next-line:no-bitwise
        c |= a[i] ^ b[i];
    }
    return c === 0;
}
exports.default = (body, signature, key) => {
    const p = signature.split("=");
    if (p.length !== 2) {
        return false;
    }
    try {
        const hash = crypto.createHmac(p[0], key);
        const source = new Buffer(hash.update(body, "utf8").digest("hex"));
        return eq(source, new Buffer(p[1]));
    }
    catch (e) {
        return false;
    }
};
