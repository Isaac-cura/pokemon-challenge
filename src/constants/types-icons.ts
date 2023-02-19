
const basePath = "assets/pokemon-type-icons"
const fixedType = (unfixedType: string) => [
    "bug",
    "dark", /**@todo add dark icon */
    "dragon", /**@todo add dragon icon */
    "electric",    
    "fairy", /**@todo add fairy icon */
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic", /**@todo psychic this icon */
    "rock",
    "shadow", /**@todo add shadow icon */
    "steel",
    "water"].find(type => type == unfixedType) || "unknown"

/**Due the lack of this info in the endpoint map it its needed */
export const pokemonTypeIcon = (pokemonType: string): string => 
    `${basePath}/${fixedType(pokemonType)}.svg`