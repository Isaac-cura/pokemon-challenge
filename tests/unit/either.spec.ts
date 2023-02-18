import { Failure, Success } from "@/models/either"

describe("Test suite for either type checking", () => {
    it("Success.create method return success instance", () => {
        expect(Success.create()).toBeInstanceOf(Success)
    })
    it("Success.result have the provided value", () => {
        const value = 5;
        expect(Success.create(value).result).toBe(5)
    })
    it("Success instance returns true in succeded property and false in failed property", ()=> {
        expect(Success.create().succeeded).toBeTruthy();
        expect(Success.create().failed).toBeFalsy()
    })
    it("Failure.create method return error instance", () => {
        expect(Failure.create()).toBeInstanceOf(Failure);
    })
    it("Failure.error have the provided value", () => {
        const value = 5
        expect(Failure.create(value).error).toBe(value);
    })
    it("Failure instance returns false in succeded property and true in failed property", () => {
        expect(Failure.create().succeeded).toBeFalsy()
        expect(Failure.create().failed).toBeTruthy()
    })
})