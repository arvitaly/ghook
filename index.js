"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_payload_1 = require("./check-payload");
class GHook {
    constructor(config) {
        this.config = config;
        this.listeners = [];
    }
    message(type, signature, body) {
        const payload = JSON.parse(body);
        if (!payload.repository || !payload.repository.name) {
            throw new Error("Not found repository.name in payload");
        }
        if (!this.config.repos[payload.repository.name]) {
            throw new Error("Not found config for " + payload.repository.name);
        }
        if (!check_payload_1.default(body, signature, this.config.repos[payload.repository.name].secret)) {
            throw new Error("Invalid signature " + signature + " for repo " + payload.repository.name);
        }
        this.listeners.filter((listener) => {
            return listener.type === "*" || listener.type === type;
        }).map((l) => setTimeout(() => l.callback(payload)));
    }
    handler(request, response) {
        const payload = request.body;
        response.send(this.message(request.headers["x-github-event"], request.headers["x-hub-signature"], payload));
        response.end();
    }
    on(event, callback) {
        this.listeners.push({
            type: event,
            callback,
        });
        return this;
    }
    off(event, callback) {
        this.listeners = this.listeners.filter((l) => l.type === event && l.callback === callback);
        return this;
    }
}
exports.default = GHook;
