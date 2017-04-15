import crypto = require("crypto");
function eq(a: Buffer, b: Buffer) {
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

export default (body: string, signature: string, key: string) => {
    const p = signature.split("=");
    if (p.length !== 2) {
        return false;
    }
    try {
        const hash = crypto.createHmac(p[0], key);
        const source = new Buffer(hash.update(body, "utf8").digest("hex"));
        return eq(source, new Buffer(p[1]));
    } catch (e) {
        return false;
    }
};
