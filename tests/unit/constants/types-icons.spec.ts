import { pokemonTypeIcon } from "@/constants/types-icons"

describe("test suite for type icons mapper", () => {
    it("pokemon type mapper returns valid icon path when a valid type its provided", () => {
        const pokemonType = "poison";
        expect(pokemonTypeIcon(pokemonType)).toBe(`assets/pokemon-type-icons/${pokemonType}.svg`);
    })

    it("pokemon type icon mapper return path of unkown icon when the pokemon type was not valid", () => {
        const invalidPokemonType = "asdfasdfasdfa";
        expect(pokemonTypeIcon(invalidPokemonType)).toBe("assets/pokemon-type-icons/unknown.svg");

    })

    it("pokemon type icon mapper return path of unkonwn icon when the pokemon has unkown type", () => {
        expect(pokemonTypeIcon("unknown")).toBe("assets/pokemon-type-icons/unknown.svg");
    })
})