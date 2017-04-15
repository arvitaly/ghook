import checkPayload from "./check-payload";
import { GitHubEvent, Payload } from "./interfaces";
import express = require("express");
export interface IConfig {
    repos: {
        [index: string]: {
            secret: string;
        };
    };
}
export default class GHook {
    protected listeners: IListener[] = [];
    constructor(protected config: IConfig) { }
    public message(type: GitHubEvent, signature: string, body: string) {
        const payload: Payload = JSON.parse(body);
        if (!payload.repository || !payload.repository.name) {
            throw new Error("Not found repository.name in payload");
        }
        if (!this.config.repos[payload.repository.name]) {
            throw new Error("Not found config for " + payload.repository.name);
        }
        if (!checkPayload(body, signature, this.config.repos[payload.repository.name].secret)) {
            throw new Error("Invalid signature " + signature + " for repo " + payload.repository.name);
        }
        this.listeners.filter((listener) => {
            return listener.type === "*" || listener.type === type;
        }).map((l) => setTimeout(() => l.callback(payload)));
    }
    public handler(request: express.Request, response: express.Response) {
        const payload = request.body;
        this.message(request.headers["x-github-event"] as any, request.headers["x-hub-signature"], payload);
        response.send({ status: "ok" });
        response.end();
    }
    public on(event: IListenerType, callback: IListenerCallback): GHook {
        this.listeners.push({
            type: event,
            callback,
        });
        return this;
    }
    public off(event: IListenerType, callback: IListenerCallback): GHook {
        this.listeners = this.listeners.filter((l) => l.type === event && l.callback === callback);
        return this;
    }
}
export type IListenerCallback = (payload: Payload) => any;
export interface IListener {
    type: IListenerType;
    callback: IListenerCallback;
}
export type IListenerType = GitHubEvent | "*";
