import { Failure, Success } from "@/models/either"
import { dummyBulbasaurParsed } from "../dummies/bulbasaur"

export const getByNameSuccess = async () => {
    return Success.create(dummyBulbasaurParsed)
}

export const requestFailure = async () => {
    return Failure.create()
}

export const getAllSuccess = async (limit: number, offset: number) => {
    return Success.create({
        count: 500,
        results:[dummyBulbasaurParsed]
    })
}

export const getAllSuccessWithPikachu = async (limit: number, offset: number) => {
    return Success.create({
        count: 500,
        results:[{...dummyBulbasaurParsed, name: "pikachu"}]
    })
}