import { PokemonDTO } from "@/models/pokemon.model";

export const dummyBulbasaurRaw: PokemonDTO["response"] = {
    "abilities": [
        {
            "ability": {
                "name": "overgrow",
            },
        },
        {
            "ability": {
                "name": "chlorophyll",
            },
        }
    ],
    "base_experience": 64,
    "height": 7,
    "id": 1,
    "moves": [
        {
            "move": {
                "name": "razor-wind",
            }
        },
        {
            "move": {
                "name": "swords-dance",
            },
        },
        {
            "move": {
                "name": "cut",
            }
        }
    ],
    "name": "bulbasaur",
    "past_types": [],
    "sprites": {
        "other": {
            "home": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
            }
        }
    },
    "stats": [
        {
            "base_stat": 45,
            "effort": 0,
            "stat": {
                "name": "hp",
                "url": "https://pokeapi.co/api/v2/stat/1/"
            }
        },
        {
            "base_stat": 49,
            "effort": 0,
            "stat": {
                "name": "attack",
                "url": "https://pokeapi.co/api/v2/stat/2/"
            }
        }
    ],
    "types": [
        {
            "type": {
                "name": "grass",
            }
        },
        {
            "type": {
                "name": "poison",
            }
        }
    ],
    "weight": 69
}

export const dummyBulbasaurParsed = {
    id: 1,
    name: "bulbasaur",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
    experience: 64,
    moves: ["razor-wind", "swords-dance", "cut"],
    height: 7,
    weight: 69,
    abilities: ["overgrow", "chlorophyll"],
    types: ["grass", "poison"],
    stats: [        {
        base_stat: 45,
        effort: 0,
        stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/"
        }
    },
    {
        base_stat: 49,
        effort: 0,
        stat: {
            name: "attack",
            url: "https://pokeapi.co/api/v2/stat/2/"
        }
    }] 
}

