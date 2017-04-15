jest.unmock("./..");
import GHook from "./..";
jest.mock("./../check-payload", () => {
    return {
        default: () => true,
    };
});
jest.useFakeTimers();
describe("GHook", () => {
    it("when call message, should call all listener for this event type", () => {
        const gHook = new GHook({
            repos: {
                repo1: {
                    secret: "aaa",
                },
            },
        });
        const spy1 = jest.fn();
        gHook.on("push", spy1);
        const payload = {
            repository: {
                name: "repo1",
            },
            test: 5,
        };
        gHook.message("push", "sign1", JSON.stringify(payload));
        jest.runTimersToTime(10);
        expect(spy1.mock.calls.length).toEqual(1);
        expect(spy1.mock.calls[0][0]).toEqual(payload);
    });
});
