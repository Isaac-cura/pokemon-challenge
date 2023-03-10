
export interface PokemonDTO {
    response: {
        abilities: AbilityDTO[];
        base_experience: number;
        height: number;
        id: number;
        moves: { 
            move:Move
        }[];
        name: string;
        past_types: any[];
        sprites: {
            other: {
                home: {
                    front_default: string
                }
            }
        };
        stats: Stat[];
        types: {
            type: Type
        }[];
        weight: number;
    }
}

export interface AbilityDTO {
    ability: {
        name: string,
    }
}
export interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
    experience: number;
    moves: string[]
    height: number
    weight: number
    abilities: string[]
    stats: Stat[],
    types: string[]
}

export interface Move {
    name: string;
}
export interface Type {
    name: string
}

export interface Stat {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

export function transfomPokemonDTO(dto: PokemonDTO["response"]): Pokemon {
    return {
        id: dto.id,
        name: dto.name,
        imageUrl: dto?.sprites?.other?.home?.front_default,
        experience: dto.base_experience,
        moves: dto.moves.map(rawMove => rawMove.move.name),
        height: fixMeasure(dto.height),
        weight: fixMeasure(dto.weight),
        abilities: dto.abilities.map(ability => ability?.ability?.name),
        stats: dto.stats,
        types: dto.types.map(typeRaw => typeRaw?.type?.name)
    }
}

function fixMeasure(value: number) {
    return value / 10;
}